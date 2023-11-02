import { Request, Response, Router } from 'express';

import { readFile } from 'fs';
import fm from 'front-matter';

const router = Router();

router.get('/:categoryId/latest', (req: Request, res: Response) => {
  console.log('blog,latest');
  readFile(`./src/assets/${req.params.postId}.mdx`, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(fm(data));
    }
  });
});

router.get('/:categoryId/:postId', (req: Request, res: Response) => {
  console.log('blog,post');
  readFile(`./src/assets/${req.params.postId}.mdx`, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(fm(data));
    }
  });
});

export default router;
