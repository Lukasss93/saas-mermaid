import express from "express";
import * as Service from "./Service";

let router = express.Router();

router.get('/', Service.home);

router.get('/mermaid', Service.mermaid);

router.post('/generate', Service.generate);

export default router;