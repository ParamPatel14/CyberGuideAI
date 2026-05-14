import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import fraudRouter from "./fraud.js";
import guidanceRouter from "./guidance.js";
import recoveryRouter from "./recovery.js";
import documentsRouter from "./documents.js";
import complaintRouter from "./complaint.js";
import ocrRouter from "./ocr.js";
import awarenessRouter from "./awareness.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(fraudRouter);
router.use(guidanceRouter);
router.use(recoveryRouter);
router.use(documentsRouter);
router.use(complaintRouter);
router.use(ocrRouter);
router.use(awarenessRouter);

export default router;
