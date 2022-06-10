import puppeteer from 'puppeteer';
import {AllowedFormats} from "./Formats";
import MermaidError from "./MermaidError";

const port: Number = Number(process.env.PORT) || 8087;

export default class Mermaider {
    protected text: string;
    protected config: any;
    protected background: boolean;
    protected format: AllowedFormats;

    constructor(text: string) {
        this.text = text;
        this.config = {};
        this.background = true;
        this.format = 'svg';
    }

    public setBackground(background: boolean): Mermaider {
        this.background = background;
        return this;
    }

    public setFormat(format: AllowedFormats): Mermaider {
        this.format = format;
        return this;
    }

    protected async init(script, ...args) {
        let response: any = null;
        let browser = await puppeteer.launch({args: ["--no-sandbox"]});

        try {
            //load mermaid
            let renderPage = await browser.newPage();
            await renderPage.goto(
                `data:text/html,<script src="http://localhost:${port}/mermaid"></script>`
            );

            //render svg
            response = await renderPage.evaluate(script, ...args);

            //get canvas size
            let regex = /<svg viewBox="(?<x>\d+) (?<y>\d+) (?<w>\d+\.?\d*) (?<h>\d+\.?\d*)"/;
            let match = regex.exec(response);
            let width = Math.ceil(Number(match?.groups?.w || 0));
            let height = Math.ceil(Number(match?.groups?.h || 0));

            //convert svg if needed
            if (this.format !== 'svg') {
                const conversionPage = await browser.newPage();
                await conversionPage.setViewport({width: width, height: height});
                await conversionPage.setContent(response);
                response = await conversionPage.screenshot({
                    ...(this.format !== 'png' ? {quality: 100} : {}),
                    type: this.format === 'jpg' ? 'jpeg' : 'png',
                    omitBackground: !this.background
                });
            }

            //close browser
            await browser.close();

            //return response
            return response;

        } catch (e) {
            await browser.close();
            throw e;
        }
    }

    public async render(): Promise<string> {
        try {
            return await this.init(function (text, config, background) {
                // @ts-ignore
                window.mermaid.initialize(config);

                // @ts-ignore
                let result: string = window.mermaid.mermaidAPI.render('id1', text);

                if (background) {
                    result = result.replace('<style>', '<style>#id1{background:white;} ');
                }

                return result;
            }, this.text, this.config, this.background);
        } catch (e: any) {
            console.log(e);
            let message = e.message.substring(0, e.message.indexOf('at ')).trim();
            throw new MermaidError(message);
        }
    }
}