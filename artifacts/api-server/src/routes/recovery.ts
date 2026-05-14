import { Router, type IRouter } from "express";
import { EstimateRecoveryBody, EstimateRecoveryResponse } from "@workspace/api-zod";
import { estimateRecovery } from "../services/recovery-engine.js";

const router: IRouter = Router();

router.post("/recovery", (req, res) => {
  const parseResult = EstimateRecoveryBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const input = parseResult.data;
  const result = estimateRecovery({
    fraudType: input.fraudType,
    hoursElapsed: input.hoursElapsed,
    paymentMethod: input.paymentMethod,
    amountLost: input.amountLost ?? null,
    reportedToBank: input.reportedToBank ?? false,
    reportedToPolice: input.reportedToPolice ?? false,
  });

  const response = EstimateRecoveryResponse.parse(result);
  res.json(response);
});

export default router;
