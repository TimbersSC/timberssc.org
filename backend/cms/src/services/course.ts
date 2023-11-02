import {
  GetItemCommand,
  PutItemCommand,
  BatchGetItemCommand,
} from '@aws-sdk/client-dynamodb';
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb';

import { writeFile, utils, set_fs, readFile } from 'xlsx';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import { client } from './dynamodb';

import {
  Course,
  CourseEnrollment,
  User as UserSchema,
  UserDetailed,
  UserCourseAssigned,
  CourseUpload,
  CourseEnrollment$Users,
} from ':shared/schemas';

import { UserService } from ':api/services/user';
import { Ferror, removeEmpty, User } from ':api/utils';

export class Courses {
  /**
   *
   * @param courseId
   * @returns
   */
  public static async get(courseId: string): Promise<Course | void> {
    const command = new GetItemCommand({
      TableName: 'ferant-courses-details',
      Key: marshall({ id: courseId }),
    });
    let resp = await client.send(command);

    if (Object.keys(resp).includes('Item') && resp.Item) {
      return unmarshall(resp.Item) as Course;
    }
  }

  /**
   * Get a course from the OLD table
   *
   * @deprecated
   *
   * @param courseId
   * @returns
   */
  public static async get_old(courseId: string): Promise<Course | void> {
    console.warn(
      'Deprecated; used to transition all old courses into the new tables'
    );
    const command = new GetItemCommand({
      TableName: 'ferant-courses',
      Key: marshall({ id: courseId, database_type: 'details' }),
    });
    let resp = await client.send(command);

    if (Object.keys(resp).includes('Item') && resp.Item) {
      return unmarshall(resp.Item) as Course;
    }
  }

  /**
   *
   * @param payload
   */
  public static async create(payload: Course): Promise<void> {
    const command = new PutItemCommand({
      TableName: 'ferant-courses-details',
      Item: marshall(removeEmpty(payload)),
    });

    const response = await client.send(command);
  }

  /**
   *
   * @param courseIds
   * @returns
   */
  public static async batchGet(courseIds: string[]): Promise<Course[] | void> {
    // Dedupe the list
    courseIds = _.uniq(courseIds);
    const command = new BatchGetItemCommand({
      RequestItems: {
        'ferant-courses-details': {
          Keys: courseIds.map((courseId) => ({ id: { S: courseId } })),
        },
      },
    });

    let resp = await client.send(command);

    if (
      Object.keys(resp).includes('Responses') &&
      resp.Responses &&
      resp.Responses['ferant-courses-details']
    ) {
      return resp.Responses['ferant-courses-details'].map((result) =>
        unmarshall(result)
      ) as Course[];
    }
  }

  /**
   *
   * @param courseId
   */
  public static async delete(courseId: string): Promise<void> {
    throw new Ferror(501, 'Not implemented');
  }

  /**
   *
   * @param course
   * @returns
   */
  public static async upload(course: CourseUpload): Promise<Course | void> {
    const courseId = uuidv4();

    const newCourse: Course = {
      id: courseId,
      name: course.name,
      period: course.period,
      description_heading: course.description_heading,
      description: course.description,
      owner_id: User.fid,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      course_state: 0,
      organization_id: User.organizationId,
    };

    course.teachers = [...course.teachers, User.email];

    const newCourseEnrollment: CourseEnrollment = {
      id: courseId,
      teachers: {
        enrolled: [User.fid],
        pending: course.teachers,
      },
      students: {
        enrolled: [],
        pending: course.students,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const userAssigned = [...course.students, ...course.teachers].map(
      async (user: any) => {
        const u = await UserService.getByEmail(user);
        if (u) {
          const assignedCourses: UserCourseAssigned | void =
            await UserService.Course.Assigned.get((u as any).fid);

          const courses = assignedCourses?.courses || [];
          courses.push({ id: courseId, last_viewed: new Date().toISOString() });

          const starred = assignedCourses?.starred || [];

          const userAssignedCourse: UserCourseAssigned = {
            fid: (u as any).fid,
            courses: courses,
            starred: starred,
            created_at: assignedCourses?.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          await UserService.Course.Assigned.create(userAssignedCourse);
        }
      }
    );

    await Promise.all([
      Courses.create(newCourse),
      Courses.Enrollment.create(newCourseEnrollment),
      ...userAssigned,
    ]);

    return newCourse;
  }

  static Enrollment = class {
    /**
     *
     * @param courseId
     * @returns
     */
    public static async get(
      courseId: string
    ): Promise<CourseEnrollment | void> {
      const command = new GetItemCommand({
        TableName: 'ferant-courses-enrollment',
        Key: marshall({ id: courseId }),
      });
      let resp = await client.send(command);

      if (Object.keys(resp).includes('Item') && resp.Item) {
        const res = unmarshall(resp.Item) as CourseEnrollment;

        let isNotArray = false;
        ['teachers', 'students'].forEach((user: string) => {
          if (
            !Array.isArray((res as any)[user].enrolled) ||
            !Array.isArray((res as any)[user].pending)
          ) {
            ['enrolled', 'pending'].forEach((type: string) => {
              if ((res as any)[user][type]) {
                (res as any)[user][type] = Object.values(
                  (res as any)[user][type]
                );
              } else {
                (res as any)[user][type] = [];
              }
            });
            isNotArray = true;
          }
        });

        if (isNotArray) await Courses.Enrollment.create(res);

        // TODO: sync; check if pending users have signed up
        // TODO: sync;  verify with LMS if students have been moved

        return res;
      }
    }

    /**
     * Get a course from the OLD table
     *
     * @deprecated
     *
     * @param courseId
     * @returns
     */
    public static async get_old(
      courseId: string
    ): Promise<CourseEnrollment | void> {
      console.warn(
        'Deprecated; used to transition all old courses into the new tables'
      );
      const command = new GetItemCommand({
        TableName: 'ferant-courses',
        Key: marshall({ id: courseId, database_type: 'enrollment' }),
      });
      let resp = await client.send(command);

      if (Object.keys(resp).includes('Item') && resp.Item) {
        return unmarshall(resp.Item) as CourseEnrollment;
      }
    }

    /**
     *
     * @param payload
     */
    public static async create(payload: CourseEnrollment): Promise<void> {
      const command = new PutItemCommand({
        TableName: 'ferant-courses-enrollment',
        Item: marshall(removeEmpty(payload)),
      });

      const response = await client.send(command);
    }

    /**
     * Check the pending users and update the list.
     *
     * @param enrollment
     */
    public static async checkPending(
      enrollment: CourseEnrollment,
      userType: 'teachers' | 'students'
    ): Promise<any> {
      let pending: any[] = [];
      // Find users by email if there's a list for pending
      if (enrollment[userType].pending) {
        let enrollmentUpdated = false;
        const result = await Promise.allSettled(
          enrollment[userType].pending.map(
            async (email: string) => await UserService.getByEmail(email)
          )
        );

        result.forEach((r) => {
          if (r.status === 'fulfilled') {
            const user = r.value as UserSchema | undefined;
            if (!user) return;
            if (enrollment[userType].pending.includes(user.email)) {
              enrollment[userType].enrolled.push(user.fid);
              enrollment[userType].pending = enrollment[
                userType
              ].pending.filter((item: any) => item !== user.email);
              enrollmentUpdated = true;
            }
          }
        });

        pending = enrollment[userType].pending;

        // Update enrollment if we found teachers that are now a part of Ferant
        if (enrollmentUpdated) {
          Courses.Enrollment.create(enrollment);
        }
      }
    }

    /**
     * TODO: add overview page
     * @param courseId
     */
    public static async export(
      courses: Course[] | Course
    ): Promise<string | void> {
      const workbook = utils.book_new();

      const courseIds = Array.isArray(courses) ? courses : [courses];
      const organizationId = courseIds[0].organization_id || 'courses';

      const assetsConversion = await UserService.static();
      const valuesConversion = await UserService.static('values');

      const result = await Promise.allSettled(
        courseIds.map(async (course: Course, index: number) => {
          const enrollment = await Courses.Enrollment.get(course.id);
          let enrolled: any[] = [];
          let pending: any[] = [];

          if (enrollment) {
            // Find users by email if there's a list for pending
            await Courses.Enrollment.checkPending(enrollment, 'students');

            // Get batch via `fid`
            const studentsDetails: UserSchema[] =
              (await UserService.batchGet(enrollment.students.enrolled)) || [];

            if (studentsDetails) {
              let enrollmentUpdated = false;
              const result = await Promise.allSettled(
                studentsDetails.map(async (user: UserDetailed) => {
                  if (!Number(user.blocked)) {
                    user = await UserService.details(user);
                    const rawValues: any = await UserService.Identity.values(
                      user.fid
                    );
                    let values: any = {};
                    if (rawValues && rawValues.analyzed_scores) {
                      Object.keys(rawValues.analyzed_scores).forEach(
                        (value: string) => {
                          values[(valuesConversion as any)[value] as string] =
                            rawValues.analyzed_scores[value].score;
                        }
                      );

                      const items = Object.keys(values).map((key) => {
                        return [key, values[key]];
                      });
                      items.sort((first, second) => {
                        return first[1] - second[1];
                      });
                      values = items.map((e) => e[0]);
                    }

                    let totalActivity = 0;
                    user.karma?.forEach((karma) => {
                      totalActivity += karma.tasks_completed;
                    });

                    const assets =
                      user.assets?.assetFinal?.map(
                        (asset: string) => (assetsConversion as any)[asset]
                      ) || new Array(3).fill('');

                    enrolled.push({
                      email: user.email,
                      given_name: user.given_name,
                      family_name: user.family_name,
                      last_login: user.last_login,
                      lifeword: user.lifeword?.topLifeword?.trimStart() ?? '',
                      activity: totalActivity,
                      asset_1: assets[0],
                      asset_2: assets[1],
                      asset_3: assets[2],
                      // ...values,
                      value_1: values[0],
                      value_2: values[1],
                      value_3: values[2],
                    });
                  }
                })
              );

              pending = enrollment.students.pending.map((email) => ({
                email: email,
              }));

              // Update enrollment if we found students that are now a part of Ferant
              if (enrollmentUpdated) {
                Courses.Enrollment.create(enrollment);
              }
            }
          }
          const rows = [...enrolled, ...pending];
          if (rows.length) {
            const worksheet = utils.json_to_sheet(rows);

            utils.book_append_sheet(
              workbook,
              worksheet,
              createSheetName(course, index)
            );

            delete valuesConversion['data-set'];

            utils.sheet_add_aoa(
              worksheet,
              [
                [
                  'Email',
                  'Given name',
                  'Family name',
                  'Last login',
                  'Lifeword',
                  'Total activity',
                  ...Array.from({ length: 3 }, (_, i) => `Asset ${i + 1}`),
                  ...Array.from({ length: 3 }, (_, i) => `Value ${i + 1}`),
                  // ...Object.values(valuesConversion),
                ],
              ],
              { origin: 'A1' }
            );
          }
        })
      );

      const fileName = `${organizationId}-${
        new Date().toISOString().split('T')[0]
      }.xlsx`;

      try {
        await writeFile(workbook, join(__dirname, fileName), {
          compression: true,
        });
      } catch (error) {
        console.error(error);
      }
      return `${__dirname}\\${fileName}`;
    }
  };
}

/**
 * Create a shorter sheet name if the name is too long.
 *
 * If the name of the sheet is longer tha 31 characters, lets try to shorten
 * it. First we want to check if we can split the name via spaces and create an
 * acronym. If that fails, lets get the first 3 letters of the course name.
 *
 * @param course
 * @param index
 * @returns
 */
const createSheetName = (course: Course, index: number): string => {
  let period = course.period.match(/([+-]?\d+)/g) || '-';
  period = period[0];
  let sheetName = `${course.name}, P${period}, ${index}`;

  if (sheetName.length > 31) {
    let name = '';
    const splitName = course.name.split(' ');
    if (splitName.length > 1) {
      splitName.forEach((char: string) => {
        name += char[0];
      });
    } else {
      name = course.name.slice(0, 3);
    }
    sheetName = `${name}, P${period}, ${index}`;
  }

  return sheetName;
};
