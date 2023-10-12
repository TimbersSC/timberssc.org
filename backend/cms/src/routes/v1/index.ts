import { Router } from 'express';

import cmsRoute from './courses';
import users from './blog.route';

const router = Router();

router.use('/blog', users);
router.use('/cms', cmsRoute);

export default router;
