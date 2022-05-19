import exprees, { Request, Response } from "express";
import test from "./HandelAPI";
const router: exprees.Router = exprees.Router();

router.get(
  "/api/image",
  test,
  async (req: Request, res: Response): Promise<void> => {}
);
export default router;
