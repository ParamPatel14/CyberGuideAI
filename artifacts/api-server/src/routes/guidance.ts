import { Router, type IRouter } from "express";
import { GetGuidanceBody, GetGuidanceResponse } from "@workspace/api-zod";
import { getGuidance } from "../services/guidance-service.js";

const router: IRouter = Router();

router.post("/guidance", (req, res) => {
  const parseResult = GetGuidanceBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const input = parseResult.data;
  const result = getGuidance({
    fraudType: input.fraudType,
    amountLost: input.amountLost ?? null,
    hoursElapsed: input.hoursElapsed ?? null,
  });

  const response = GetGuidanceResponse.parse(result);
  res.json(response);
});

export default router;
