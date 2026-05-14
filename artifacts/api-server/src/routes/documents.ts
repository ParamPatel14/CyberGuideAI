import { Router, type IRouter } from "express";
import { GetDocumentChecklistBody, GetDocumentChecklistResponse } from "@workspace/api-zod";
import { getDocumentChecklist } from "../services/document-engine.js";

const router: IRouter = Router();

router.post("/documents", (req, res) => {
  const parseResult = GetDocumentChecklistBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const input = parseResult.data;
  const result = getDocumentChecklist({
    fraudType: input.fraudType,
    transactionMethod: input.transactionMethod ?? null,
  });

  const response = GetDocumentChecklistResponse.parse(result);
  res.json(response);
});

export default router;
