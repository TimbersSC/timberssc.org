import { Router } from 'express';

import cms from './cms.route';

const router = Router();

router.use('/', cms);

export default router;
