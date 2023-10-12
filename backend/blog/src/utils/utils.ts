import express, { Request, Response } from 'express';
import fernet from 'fernet';
import { createHash } from 'node:crypto';

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
