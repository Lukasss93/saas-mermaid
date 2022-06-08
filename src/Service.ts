import {Request, Response} from "express";
import fs from "fs";
import md5 from "md5";
import Mermaider from "./Mermaider";
import dotenv from "dotenv";

dotenv.config();
const cacheTtl: Number = Number(process.env.CACHE_TTL) || 86400;

export let home = function (req: Request, res: Response) {
    res.send('SERVICE IS UP');
};

export let mermaid = function (req: Request, res: Response) {
    res
        .type('application/javascript')
        .send(fs.readFileSync(`${__dirname}/mermaid.min.js`));
};

export let generate = async function (req: Request, res: Response) {
    try {
        const data: string = req.body.trim();

        //check if data is an empty value
        if (data === '' || data === null || data === undefined) {
            res.status(422).send('No data provided');
            return;
        }

        //initialize mermaid tools
        const mermaidTools = new Mermaider(data);

        //generate md5 from data
        const hash = md5(data);

        //check if file exists
        const filePath = `${__dirname}/../cache/${hash}.svg`;

        //create cache directory if it doesn't exist
        if (!fs.existsSync(`${__dirname}/../cache`)) {
            fs.mkdirSync(`${__dirname}/../cache`);
        }
        
        //if file not exists, generate it
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, await mermaidTools.render());
        }

        //read file
        const file = fs.readFileSync(filePath);

        //send response
        res
            .status(200)
            .type('image/svg+xml')
            .send(file);
    } catch (e: any) {
        let message = e.message.substring(0, e.message.indexOf('at ')).trim();
        console.log(message);
        res.status(422).send(message);
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
        if (diff > cacheTtl) {
            fs.unlinkSync(filePath);
            console.log(`${filePath} => expired`);
        } else {
            console.log(`${filePath} => cached`);
        }
    });

    console.log('Cache cleaned');
};