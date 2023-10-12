import express, { Request, Response } from 'express';
import fernet from 'fernet';
import { createHash } from 'node:crypto';

import {
  User as UserType,
  UserAccountType,
  UserBlocked,
} from ':shared/schemas';

export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(500);
  res.render('error', { error: err });
};

export const clientErrorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log('errorrr', err);
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
};

export const logErrors = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(err.stack);
  next(err);
};

/**
 * Custom error by Ferant
 * @author Ferant <cto@ferant.io>
 */
export class Ferror extends Error {
  public status = 500;
  public message = 'Internal Server Error';

  /**
   * Ferant Error
   * @param message
   * @param status
   */
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    Object.seal(this);
  }
}

/**
 * @BEGIN
 * Encryption and decryption
 */
const key = (): string => {
  return process.env.SECRET_KEY || '';
};

export const encrypt = (data: any, secret?: string): string => {
  if (!secret) secret = key();
  const f = new fernet.Token({ secret: new fernet.Secret(secret) });
  return f.encode(JSON.stringify(data));
};

export const decrypt = (token: any, secret?: string): string => {
  if (!secret) secret = key();
  const f = new fernet.Token({
    secret: new fernet.Secret(secret),
    token: token,
    ttl: 0,
  });
  return f.decode();
};
/**
 * Encryption and decryption
 * @END
 */

export const hashClientId = (clientId: string): string => {
  const hash = createHash('sha256');
  return hash.update(Buffer.from(clientId, 'utf8')).digest('hex').slice(0, 24);
};

class _User {
  private FID: string = '';
  private EMAIL: string = '';
  private SCOPES: string[] = [''];
  private ORG_ID: string | undefined = undefined;
  private ROLE: UserAccountType = 'User';
  private BLOCKED: boolean = false;

  public set fid(fid: string) {
    this.FID = fid;
  }

  public get fid() {
    return this.FID;
  }

  public set email(email: string) {
    this.EMAIL = email;
  }

  public get email() {
    return this.EMAIL;
  }

  public set scopes(scope: string[]) {
    this.SCOPES = scope;
  }

  public get scopes() {
    return this.SCOPES;
  }

  public set organizationId(organizationId: string | undefined) {
    this.ORG_ID = organizationId;
  }

  public get organizationId() {
    return this.ORG_ID;
  }

  public set accountType(account_type: UserAccountType) {
    this.ROLE = account_type;
  }

  public get accountType() {
    return this.ROLE;
  }

  public set blocked(blocked: UserBlocked) {
    this.BLOCKED = !!blocked;
  }

  public get blocked(): boolean {
    return this.BLOCKED;
  }
}

export const User = new _User();

export const removeEmpty = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};

export const isStringsArray = (arr: any[]) =>
  arr.every((i) => typeof i === 'string');

export const sortByDate = <T>(
  array: T[],
  key: keyof T,
  ascending: boolean = false
): void => {
  array.sort((a: T, b: T) => {
    const j = Date.parse(a[key] as string);
    const k = Date.parse(b[key] as string);
    if (ascending) return j - k;
    return k - j;
  });
};
