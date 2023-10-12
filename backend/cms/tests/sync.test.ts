// @ts-nocheck
import { app } from '../src/app';
import supertest from 'supertest';

describe('testing sync route', () => {
  let request: any;
  beforeEach(() => {
    jest.setTimeout(60000);

    jest.resetModules();
    process.env.TEST_USER = 'NORMAL';
    request = supertest(app);
  });

  it('should return a list of courses for POST /courses/v1/sync', async () => {
    const resp = await request.post('/v1/sync');
    expect(resp.status).toBe(200);
    expect(resp.body.courses.length).toBeGreaterThan(0);
  });
});
