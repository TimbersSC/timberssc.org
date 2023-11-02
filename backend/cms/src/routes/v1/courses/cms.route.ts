import { Request, Response, Router } from 'express';
import fm from 'front-matter';
import { readFile } from 'fs';

import { Courses } from ':api/services/course';
import { UserService } from ':api/services/user';
import { User, Roles, Ferror, sortByDate } from ':api/utils';

const router = Router();

router.get('/latest', (req: Request, res: Response) => {
  console.log(req.params);

  readFile(`./src/assets/${req.params.postId}.mdx`, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(fm(data));
    }
  });
});

router.get('/:categoryId/latest', (req: Request, res: Response) => {
  console.log('22', req.params);

  readFile(`./src/assets/${req.params.postId}.mdx`, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(fm(data));
    }
  });
});

router.get('/:categoryId/:postId', (req: Request, res: Response) => {
  console.log('36', req.params);

  readFile(`./src/assets/${req.params.postId}.mdx`, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(fm(data));
    }
  });
});

router.post('/:categoryId/:postId', (req: Request, res: Response) => {
  console.log('49', req.params);

  readFile(`./src/assets/${req.params.postId}.mdx`, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(fm(data));
    }
  });
});

router.delete('/:categoryId/:postId', (req: Request, res: Response) => {
  console.log('61', req.params);

  readFile(`./src/assets/${req.params.postId}.mdx`, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(fm(data));
    }
  });
});

export default router;
