import {Request, Response} from "express";
import fs from "fs";
import md5 from "md5";
import Mermaider from "./Mermaider";
import {formats, MermaidFormat} from "./Formats";
import config from "./config";
import probe from "probe-image-size";

export let home = function (req: Request, res: Response) {
    res.send(`SERVICE IS UP<br>${config.app.name} v${config.app.version}`);
};

export let mermaid = function (req: Request, res: Response) {
    res
        .type('application/javascript')
        .send(fs.readFileSync(`${__dirname}/mermaid.min.js`));
};

export let render = async function (req: Request, res: Response) {
    try {
        //get text from request
        let text: string|undefined;
        
        if(req.method === 'GET'){
            text = String(req?.query?.text || '').trim();
        } else {
            text = req.body.trim();
        }
        
        //check if text is an empty value
        if (text === '' || text === null || text === undefined) {
            throw new Error('No text provided');
        }

        //initialize mermaid tools
        const mermaider = new Mermaider(text);

        //enable/disable background
        const background: string = String(req?.query?.background || 'white').toLowerCase();
        mermaider.setBackground(background);
        
        //set format
        const ext: string = String(req.params.ext || 'svg').toLowerCase();
        const format: MermaidFormat | undefined = formats.find(x => x.extension === ext);
        if (format === undefined) {
            throw new Error(`Format ${ext} is not supported`);
        }
        mermaider.setFormat(format.extension);

        //generate md5 from text
        const hash = md5(text + background + ext);

        //build file name
        const fileName = `${hash}.${ext}`;

        //build file path
        const filePath = `${__dirname}/../cache/${fileName}`;

        //create cache directory if it doesn't exist
        if (!fs.existsSync(`${__dirname}/../cache`)) {
            fs.mkdirSync(`${__dirname}/../cache`);
        }

        //delete cache file after ttl
        if (fs.existsSync(filePath)) {
            const fileCreationTime = fs.statSync(filePath).ctime;
            const currentTime = new Date();
            const diff = (currentTime.getTime() - fileCreationTime.getTime()) / 1000;

            if(diff > config.cache.ttl) {
                fs.unlinkSync(filePath);
            }
        }
        
        //if file not exists, generate it
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, await mermaider.render());
        }

        //read file
        const file = fs.readFileSync(filePath);
        
        //get image size
        let fileProbe = probe.sync(file);
        let fileWidth = Math.ceil(fileProbe?.width ?? 0);
        let fileHeight = Math.ceil(fileProbe?.height ?? 0);
        
        //send response
        res
            .status(200)
            .type(format.mime)
            .setHeader('X-Hash', `${fileName}`)
            .setHeader('X-Width', `${fileWidth}`)
            .setHeader('X-Height', `${fileHeight}`)
            .send(file);
        
    } catch (e: any) {
        console.log(e);
        res.status(422).send(e.message);
    }
};

export let cleanCache = async function () {
    //create cache directory if it doesn't exist
    if (!fs.existsSync(`${__dirname}/../cache`)) {
        return;
    }

    console.log('Cleaning cache...');

    const currentTime = new Date();

    const files = fs.readdirSync(`${__dirname}/../cache`);
    files.forEach((file) => {
        const filePath = `${__dirname}/../cache/${file}`;
        const fileCreationTime = fs.statSync(filePath).ctime;
        const diff = (currentTime.getTime() - fileCreationTime.getTime()) / 1000;
        if (diff > config.cache.ttl) {
            fs.unlinkSync(filePath);
            console.log(`${filePath} => expired`);
        } else {
            console.log(`${filePath} => cached`);
        }
    });

    console.log('Cache cleaned');
};

export let cached = async function (req: Request, res: Response) {

    //get parameters
    const hash: string = String(req.params.hash).toLowerCase();
    const ext: string = String(req.params.ext || 'svg').toLowerCase();

    //build file path
    const filePath = `${__dirname}/../cache/${hash}.${ext}`;

    //if file not exists, return 404
    if (!fs.existsSync(filePath)) {
        res.status(404).send('Not found');
        return;
    }

    //calc mime
    const format: MermaidFormat | undefined = formats.find(x => x.extension === ext);
    if (format === undefined) {
        res.status(404).send('Not found');
        return;
    }

    //read file
    const file = fs.readFileSync(filePath);

    //send response
    res
        .status(200)
        .type(format.mime)
        .send(file);
};