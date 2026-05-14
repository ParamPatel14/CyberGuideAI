import { Router, type IRouter } from "express";
import { GenerateComplaintBody, GenerateComplaintResponse } from "@workspace/api-zod";
import { generateComplaints } from "../services/complaint-generator.js";

const router: IRouter = Router();

router.post("/complaint", (req, res) => {
  const parseResult = GenerateComplaintBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const input = parseResult.data;
  const result = generateComplaints({
    fraudType: input.fraudType,
    victimName: input.victimName,
    victimAddress: input.victimAddress ?? null,
    victimPhone: input.victimPhone ?? null,
    incidentDate: input.incidentDate ?? null,
    amountLost: input.amountLost ?? null,
    bankName: input.bankName ?? null,
    transactionId: input.transactionId ?? null,
    description: input.description,
  });

  const response = GenerateComplaintResponse.parse(result);
  res.json(response);
});

export default router;
