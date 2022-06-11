import express from "express";
import * as Service from "./Service";

let router = express.Router();

router.get('/', Service.home);

router.get('/mermaid', Service.mermaid);

router.get('/render(\.:ext)?', Service.render);
router.post('/render(\.:ext)?', Service.render);

export default router;