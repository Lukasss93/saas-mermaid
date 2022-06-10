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

    protected getChartType(): string | null {

        if (this.text.match(/\b(graph|flowchart)\b/ig) !== null) {
            return 'flowchart';
        }

        if (this.text.match(/\b(sequenceDiagram)\b/ig) !== null) {
            return 'sequenceDiagram';
        }

        if (this.text.match(/\b(classDiagram)\b/ig) !== null) {
            return 'classDiagram';
        }

        if (this.text.match(/\b(stateDiagram-v2)\b/ig) !== null) {
            return 'stateDiagram-v2';
        }

        if (this.text.match(/\b(gantt)\b/ig) !== null) {
            return 'gantt';
        }

        if (this.text.match(/\b(pie)\b/ig) !== null) {
            return 'pie';
        }

        if (this.text.match(/\b(erDiagram)\b/ig) !== null) {
            return 'erDiagram';
        }

        if (this.text.match(/\b(journey)\b/ig) !== null) {
            return 'journey';
        }

        if (this.text.match(/\b(gitGraph)\b/ig) !== null) {
            return 'gitGraph';
        }

        return null;
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
            let regex = /viewBox="(?<x>-?\d+\.?\d*) (?<y>-?\d+\.?\d*) (?<w>\d+\.?\d*) (?<h>\d+\.?\d*)"/;
            let match = regex.exec(response);
            let w = Math.ceil(Number(match?.groups?.w || 0));
            let h = Math.ceil(Number(match?.groups?.h || 0));
            let offsetX = 0;
            let offsetY = 0;

            //get chart type
            if (this.getChartType() === 'gitGraph') {
                offsetX = 40;
            }

            //convert svg if needed
            if (this.format !== 'svg') {
                const conversionPage = await browser.newPage();
                await conversionPage.setViewport({width: w + offsetX, height: h + offsetY});
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