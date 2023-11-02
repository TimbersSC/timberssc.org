// @ts-nocheck
import { app } from '../src/app';
import supertest from 'supertest';

describe('testing activity route', () => {
  let request: any;
  beforeEach(() => {
    jest.setTimeout(60000);

    jest.resetModules();
    process.env.TEST_USER = 'NORMAL';
    request = supertest(app);
  });

  it('should return a list of courses for GET /courses/v1/activity', async () => {
    const resp = await request.get('/v1/activity');
    expect(resp.status).toBe(200);
    expect(resp.body.activity.length).toBeGreaterThan(0);
    // expect(
    //   new Date(resp.body.activity[0].created_at).getTime()
    // ).toBeGreaterThan(new Date(resp.body.activity.pop().created_at).getTime());
  });

  // it('should return a specific course for GET /courses/v1/activity/:id', async () => {
  //   const resp = await request.get(
  //     '/courses/v1/activity/0a739ed7-14d2-42b3-98bf-49ac4580a5b7'
  //   );
  //   expect(resp.status).toBe(200);
  //   expect(resp.body.id).toBe('0a739ed7-14d2-42b3-98bf-49ac4580a5b7');
  // });

  // shoudl not get f45fbcd8-e94a-41d8-b9d2-921d6f09b7e1
});
