import { Request, Response, Router } from 'express';

import v1 from './v1';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.status(200).json('Health check');
});

router.use('', v1);

export default router;
