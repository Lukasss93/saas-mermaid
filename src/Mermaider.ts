import puppeteer from 'puppeteer';

const port: Number = Number(process.env.PORT) || 8087;

export default class Mermaider {
    protected text: string;
    protected config: any = {};
    
    constructor(text: string) {
        this.text = text;
    }

    protected async init(script, ...args) {
        let response: any = null;
        let browser = await puppeteer.launch({args: ["--no-sandbox"]});

        try {
            let page = await browser.newPage();
            await page.goto(
                `data:text/html,<script src="http://localhost:${port}/mermaid"></script>`
            );
            
            response = await page.evaluate(script, ...args);

            await browser.close();

            return response;

        } catch (e) {
            await browser.close();
            throw e;
        }
    }
    
    public async isValid(): Promise<boolean> {
        try {
            await this.init(function (text, config) {
                // @ts-ignore
                window.mermaid.initialize(config);

                // @ts-ignore
                return window.mermaid.mermaidAPI.parse(text);
            }, this.text, this.config);

            return true;
        } catch (e) {
            return false;
        }
    }

    public async render(): Promise<string> {
        return await this.init(function (text, config) {
            // @ts-ignore
            window.mermaid.initialize(config);

            // @ts-ignore
            let result:string = window.mermaid.mermaidAPI.render('id1', text);
            
            result = result.replace('<style>','<style>#id1{background:white;} ');
            
            return result;
        }, this.text, this.config);
    }
}