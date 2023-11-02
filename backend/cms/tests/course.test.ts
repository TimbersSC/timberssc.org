// @ts-nocheck
import supertest from 'supertest';
import fs from 'fs';

import { app } from '../src/app';
import { TEST_USER, fromDir } from './test.config';

describe('testing courses route', () => {
  let request: any;
  let USER_CHOICE: any;
  beforeEach(() => {
    jest.resetModules();
    process.env.TEST_USER = 'NORMAL';
    USER_CHOICE = (TEST_USER as any)[process.env.TEST_USER || 'NORMAL'];
    request = supertest(app);
  });

  it('should return a list of courses for GET /courses/v1/', async () => {
    const resp = await request.get('/v1/');
    expect(resp.status).toBe(200);
    expect(resp.body.courses.length).toBeGreaterThan(0);
    expect(Date.parse(resp.body.courses[0].last_viewed)).toBeGreaterThanOrEqual(
      Date.parse(resp.body.courses[1].last_viewed)
    );
  });

  it('should return an *.xlsx file with details about the courses for GET /courses/v1/export', async () => {
    const resp = await request.post('/v1/export');
    expect(resp.status).toBe(200);
    // expect(resp.text).toMatchSnapshot(); // Use only if the file is deterministic.

    // fromDir(__dirname + '/../src/services', '.xlsx');
  });

  it('should return a specific course for GET /courses/v1/:id', async () => {
    const USER = TEST_USER[USER_CHOICE.fid];
    const resp = await request.get(`/v1/${USER.courses[0]}`);
    expect(resp.status).toBe(200);
    expect(resp.body.id).toBe(USER.courses[0]);
  });

  // shoudl not get f45fbcd8-e94a-41d8-b9d2-921d6f09b7e1

  it('should return a course for POST /courses/v1/:id', async () => {
    const resp = await request.post(`/v1/`).send({
      students: [
        'isabella.bentivegna@chsd117.org',
        'madison.caldwell@chsd117.org',
        'michael.castro@chsd117.org',
        'ariell.coddington@chsd117.org',
        'aubrie.davis@chsd117.org',
        'james.florreich@chsd117.org',
        'jose.gil@chsd117.org',
        'nicholas.hoffmann@chsd117.org',
        'hudson.horstein@chsd117.org',
        'sydney.lemmermann@chsd117.org',
        'parker.mezo@chsd117.org',
        'peter.ney@chsd117.org',
        'alex.pakula@chsd117.org',
        'diya.patel@chsd117.org',
        'zeke.quane@chsd117.org',
        'sairy.servin@chsd117.org',
        'chase.stout@chsd117.org',
        'shannon.sullivan@chsd117.org',
        'xavier.vargas@chsd117.org',
      ],
      teachers: ['keith.west@chsd117.org'],
      owner_id: 'd758d0a5-3366-4fd8-96ba-9066659d41c0',
      name: 'Reading Improvement',
      period: '0',
      description: '',
      description_heading: '',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.id).toBe(USER.courses[0]);
  });

  // it('should return a specific course for GET /courses/v1/:id/star', async () => {
  //   const USER = TEST_USER[USER_CHOICE.fid];
  //   const resp = await request.get(`/v1/${USER.courses[0]}/star`);
  //   expect(resp.status).toBe(200);
  //   expect(resp.body.assigned.starred).toInclude();
  // });
});
