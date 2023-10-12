// @ts-nocheck
import supertest from 'supertest';

import { app } from '../src/app';
import { TEST_USER } from './test.config';

describe('testing /:id/students route', () => {
  let request: any;
  let USER_CHOICE: any;
  beforeEach(() => {
    jest.setTimeout(60000);

    jest.resetModules();
    process.env.TEST_USER = 'NORMAL';
    USER_CHOICE = (TEST_USER as any)[process.env.TEST_USER || 'NORMAL'];

    request = supertest(app);
  });

  it('should return a list of students for a specific course for GET /:id/students', async () => {
    const USER = TEST_USER[USER_CHOICE.fid];

    const resp = await request.get(`/v1/${USER.courses[0]}/students`);
    expect(resp.status).toBe(200);
    if (resp.body.students.enrolled.length) {
      expect(resp.body.students.enrolled.length).toBeGreaterThan(0);
      expect(resp.body.students.enrolled[0]).toHaveProperty(
        'assets',
        'lifeword',
        'karma'
      );
    } else {
      expect(resp.body.students.pending.length).toBeGreaterThan(0);
    }
  });

  // it('should return a specific student part of a specific course for GET /:id/students/:fid', async () => {
  //   const resp = await request.get(
  //     '/v1/0a739ed7-14d2-42b3-98bf-49ac4580a5b7/students/5ec4532b-0cdd-47b3-88d3-7676d9c333a8'
  //   );
  //   expect(resp.status).toBe(200);
  //   expect(resp.body.fid).toBe('5ec4532b-0cdd-47b3-88d3-7676d9c333a8');
  // });

  // should not get f45fbcd8-e94a-41d8-b9d2-921d6f09b7e1
});
