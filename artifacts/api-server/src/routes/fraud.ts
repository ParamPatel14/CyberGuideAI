import { Router, type IRouter } from "express";
import { AnalyzeFraudBody, AnalyzeFraudResponse } from "@workspace/api-zod";
import { analyzeFraud } from "../services/fraud-classifier.js";

const router: IRouter = Router();

router.post("/analyze", (req, res) => {
  const parseResult = AnalyzeFraudBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const input = parseResult.data;
  const result = analyzeFraud({
    fraudType: input.fraudType,
    amountLost: input.amountLost ?? null,
    transactionMethod: input.transactionMethod ?? null,
    incidentDate: input.incidentDate ?? null,
    bankName: input.bankName ?? null,
    upiId: input.upiId ?? null,
    phoneNumber: input.phoneNumber ?? null,
    description: input.description,
    hoursElapsed: input.hoursElapsed ?? null,
  });

  const response = AnalyzeFraudResponse.parse(result);
  res.json(response);
});

export default router;
