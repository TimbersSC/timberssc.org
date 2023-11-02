// @ts-nocheck
import { app } from '../src/app';
import supertest from 'supertest';

describe('testing unauthorized access', () => {
  let request: any;
  beforeEach(() => {
    jest.setTimeout(60000);

    jest.resetModules();
    process.env.TEST_USER = 'FAILING';
    request = supertest(app);
  });

  it('should return a 401 for `Invalid scopes` for GET /', async () => {
    const resp = await request.get('/');
    expect(resp.status).toBe(401);
    expect(resp.body).toBe('Invalid scopes');
  });
});

describe('testing user access', () => {
  let request: any;
  beforeEach(() => {
    jest.setTimeout(60000);

    jest.resetModules();
    process.env.TEST_USER = 'NORMAL';
    request = supertest(app);
  });

  it('should return `Health check` for GET /', async () => {
    const resp = await request.get('/');
    expect(resp.status).toBe(200);
    expect(resp.body).toBe('Health check');
  });
});
