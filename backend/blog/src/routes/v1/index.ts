import { Router } from 'express';

import blog from './blog.route';
import changelog from './changelog.route';

const router = Router();

router.use('/blog', blog);
router.use('/changelog', changelog);

export default router;
