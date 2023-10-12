/**
 * @NOTES when we want to search article by category, use `CONTAINS`
 *
 * @REF https://stackoverflow.com/questions/44990872/dynamodb-query-by-contains-one-of-the-values-from-array-for-node-js
 */
import { Request, Response, Router } from 'express';

import { readFile } from 'fs';
import fm from 'front-matter';

const router = Router();

router.get('/latest', (req: Request, res: Response) => {
  res.send({});
  // readFile(`./src/assets/${req.params.postId}.md`, 'utf8', (err, data) => {
  //   if (err) {
  //     res.status(404).send(err);
  //   } else {
  //     res.send(fm(data));
  //   }
  // });
});

router.get('/:postId', (req: Request, res: Response) => {
  readFile(`./src/assets/${req.params.postId}.md`, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(fm(data));
    }
  });
});

export default router;
