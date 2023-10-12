import { Request, Response, NextFunction } from 'express';
import { getCurrentInvoke } from '@vendia/serverless-express';

import { UserAccountType, UserBlocked } from ':shared/schemas';
import {
  Ferror,
  errorHandler,
  logErrors,
  clientErrorHandler,
  User,
} from './utils';
import { UserService } from ':api/services/user';

interface RolesOptionsProps {
  roles?: UserAccountType[];
}

interface OrganizationOptionsProps extends RolesOptionsProps {}

/**
 * Check the calling user's account type to see if they're allowed to call the
 * API.
 *
 * @param options
 * @returns
 */
export const Roles = (options: RolesOptionsProps) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { roles = ['User'] } = options;

    // Check if user is blocked and if they contain the permitted roles
    if (roles.includes(User.accountType) && !Number(User.blocked)) {
      return next();
    }
    // Return forbidden error
    res.status(403).send('Forbidden access');
  };
};

/**
 * Check if the calling user is authorized via organization ID.
 *
 * @param options
 */
export const Organization = (options: OrganizationOptionsProps) => {};

/**
 * Authorize the calling user.
 *
 * @param SCOPES an array of strings representing allowed scopes for the API
 * @returns
 */
export const Authorizer = (SCOPES: string[]): any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { event = {} } = getCurrentInvoke();

      if (process.env.NODE_ENV === 'test') {
        // @ts-ignore

        const { TEST_USER } = await import('../../tests/test.config');
        Object.assign(event, {
          requestContext: {
            authorizer: (TEST_USER as any)[process.env.TEST_USER || 'NORMAL'],
          },
        }); // requestContext.authorizer
      }

      const { fid, scope } = event.requestContext.authorizer;
      const user = await UserService.get(fid);

      if (!user) {
        throw new Ferror(401, 'Requesting user does not exist');
      }

      const verifyScopes = scope
        .split(' ')
        .some((s: string) => SCOPES.includes(s));
      if (!verifyScopes) {
        throw new Ferror(401, 'Invalid scopes');
      }

      User.fid = fid;
      User.email = user.email;
      User.scopes = scope;
      User.organizationId = user.organization_id;
      User.accountType = user.account_type;
      next();
    } catch (error: any) {
      console.error(error);
      next(error);
    }
  };
};

/**
 * Log info so that we can see what the call looks like
 * @param req
 * @param res
 * @param next
 */
export const LogRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(
      JSON.stringify({
        path: req.originalUrl,
      })
    );
    console.log(JSON.stringify(User));
  } finally {
    return next();
  }
};
