import express from 'express';
import serverlessExpress from '@vendia/serverless-express';
import { customDomainReroute } from '@turinggroup/serverless-express-custom-domain-middleware';
import cors from 'cors';

import routes from './routes';

import {
  errorHandler,
  logErrors,
  clientErrorHandler,
  Authorizer,
  LogRequest,
} from './utils';

const SCOPES = ['clerk.class', 'clerk.class.readonly'];
export const app = express();

app.use(
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  })
);
app.use(customDomainReroute);

app.use(express.json());
// app.use(Authorizer(SCOPES));
app.use(LogRequest);

app.use('/', routes);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404);
  }
);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res
      .status(err.status || 500)
      .json(err.message || 'Internal Server Error')
      .send();
  }
);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

export const handler = serverlessExpress({
  app,
  respondWithErrors: true,
  // @ts-ignore
  log: {
    info(message: any, additional: any) {
      console.info(message, additional);
    },
    debug(message: any, additional: any) {
      console.debug(message, additional);
    },
    error(message: any, additional: any) {
      console.error(message, additional);
    },
  },
});