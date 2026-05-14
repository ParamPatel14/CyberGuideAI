import { Router, type IRouter } from "express";
import { GetAwarenessDataResponse } from "@workspace/api-zod";
import { getAwarenessData } from "../services/awareness-data.js";

const router: IRouter = Router();

router.get("/awareness", (_req, res) => {
  const result = getAwarenessData();
  const response = GetAwarenessDataResponse.parse(result);
  res.json(response);
});

export default router;
