import { Request, Response, Router } from 'express';

import { readFile } from 'fs';
import fm from 'front-matter';

const router = Router();

router.get('/latest', (req: Request, res: Response) => {
  readFile(`./src/assets/${req.params.postId}.mdx`, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(fm(data));
    }
  });
});

router.get('/:postId', (req: Request, res: Response) => {
  console.log('changelog/:postId', req.params.postId);
  res.send('## test');
  // readFile(`./src/assets/${req.params.postId}.mdx`, 'utf8', (err, data) => {
  //   if (err) {
  //     res.status(404).send(err);
  //   } else {
  //     res.send(fm(data));
  //   }
  // });
});

export default router;
