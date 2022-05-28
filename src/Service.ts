import {Request, Response} from "express";
import fs from "fs";

export let home = function (req: Request, res: Response) {
    res.send('SERVICE IS UP');
};

export let mermaid = function (req: Request, res: Response) {
    res
        .type('application/javascript')
        .send(fs.readFileSync(`${__dirname}/mermaid.min.js`));
}