import exprees, { Request, Response } from 'express';
import test from './HandelAPI';
const router: exprees.Router = exprees.Router();

router.get('/api/image', test, (req: Request, res: Response) => {});
export default router;
