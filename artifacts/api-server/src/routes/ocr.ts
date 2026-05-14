import { Router, type IRouter } from "express";
import { ScanEvidenceBody, ScanEvidenceResponse } from "@workspace/api-zod";
import { processOcrScan } from "../services/ocr-service.js";

const router: IRouter = Router();

router.post("/ocr", (req, res) => {
  const parseResult = ScanEvidenceBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { imageBase64 } = parseResult.data;
  const result = processOcrScan(imageBase64);

  const response = ScanEvidenceResponse.parse(result);
  res.json(response);
});

export default router;
