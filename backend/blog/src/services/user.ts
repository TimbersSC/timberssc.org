import {
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  BatchGetItemCommand,
} from '@aws-sdk/client-dynamodb';
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb';
import _ from 'lodash';

import { client } from './dynamodb';

import {
  UserCourseAssigned,
  User,
  UserDetailed,
  UserCourseAssignedDetails,
  CourseEnrollment,
} from ':shared/schemas';
import { removeEmpty, isStringsArray } from ':api/utils';

interface Users$Credentials$Get$Return {
  productId: string;
  clientId: string;
  credential: string;
}

interface Users$Credentials$Create$Payload$Schema {
  type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

type IdentityMarkers = 'lifeword' | 'values' | 'assets';

/**
 *
 */
export class UserService {
  /**
   * Get static content
   * @returns
   */
  public static async static(
    dataSet: IdentityMarkers = 'assets'
  ): Promise<any | void> {
    const command = new GetItemCommand({
      TableName: 'conversion_lifewords',
      Key: marshall({ 'data-set': dataSet }),
    });
    let resp = await client.send(command);

    if (Object.keys(resp).includes('Item') && resp.Item) {
      return unmarshall(resp.Item);
    }
  }

  /**
   *
   * @param userId
   * @returns
   */
  public static async get(userId: string): Promise<User | void> {
    const command = new GetItemCommand({
      TableName: 'ferant-users',
      Key: marshall({ fid: userId }),
    });
    let resp = await client.send(command);

    if (Object.keys(resp).includes('Item') && resp.Item) {
      return unmarshall(resp.Item) as User;
    }
  }

  /**
   * Batch get users
   * @param userIds fids
   * @returns array of Users
   */
  public static async batchGet(userIds: string[]): Promise<User[] | void> {
    // Dedupe the list
    userIds = _.uniq(userIds);
    const command = new BatchGetItemCommand({
      RequestItems: {
        'ferant-users': {
          Keys: userIds.map((userIds) => ({ fid: { S: userIds } })),
        },
      },
    });

    let resp = await client.send(command);

    if (
      Object.keys(resp).includes('Responses') &&
      resp.Responses &&
      resp.Responses['ferant-users']
    ) {
      return resp.Responses['ferant-users'].map((result) =>
        unmarshall(result)
      ) as User[];
    }
  }

  public static async details(
    user: User,
    timeframe: number | void
  ): Promise<UserDetailed> {
    delete (user as any).last_ip;
    delete (user as any).last_password_reset;
    delete (user as any).email_verified;

    const karmaParams: any = { userId: user.fid };
    if (timeframe) {
      karmaParams.timeframe = timeframe;
    }

    // TODO: fetch user's task manager overview
    const result = await Promise.allSettled([
      UserService.Identity.assets(user.fid),
      UserService.Identity.lifeword(user.fid),
      UserService.Karma.get(karmaParams),
      // UserService.Todos.get(user.fid),
    ]);

    const ORDER = ['assets', 'lifeword', 'karma'];
    result.forEach((res, index) => {
      let r: any = {};
      if (res.status === 'fulfilled') {
        delete (res.value as any).fid;
        delete (res.value as any).type;
        delete (res.value as any).iat;
        delete (res.value as any).exp;
        r = res.value;
      }
      (user as any)[ORDER[index]] = r;
    });

    return user;
  }

  static Identity = class {
    /**
     * Fetch the user's identities
     *
     * @param userId
     * @returns
     */
    public static async list(userId: string): Promise<Object | void> {
      const res = await Promise.allSettled([
        UserService.Identity.assets(userId),
        UserService.Identity.lifeword(userId),
        UserService.Identity.values(userId),
      ]);

      const resp = res.map((result) => {
        if (result.status == 'fulfilled') {
          return result.value;
        }
      });

      return resp;
    }

    /**
     * Fetch the user's assets
     *
     * @param userId
     * @returns
     */
    public static async assets(userId: string): Promise<Object | void> {
      const command = new QueryCommand({
        TableName: 'ferant-assets',
        KeyConditionExpression:
          'fid = :pk AND begins_with(#dynobase_type, :sk)',
        ExpressionAttributeValues: {
          ':pk': { S: userId },
          ':sk': { S: 'assets' },
        },
        ExpressionAttributeNames: { '#dynobase_type': 'type' },
      });
      let resp = await client.send(command);

      if (
        Object.keys(resp).includes('Items') &&
        resp.Items &&
        resp.Items.length > 0
      ) {
        return unmarshall(resp.Items[0]);
      }
    }

    /**
     * Fetch the user's lifeword
     *
     * @param userId
     * @returns
     */
    public static async lifeword(userId: string): Promise<Object | void> {
      const command = new QueryCommand({
        TableName: 'ferant-assets',
        KeyConditionExpression:
          'fid = :pk AND begins_with(#dynobase_type, :sk)',
        ExpressionAttributeValues: {
          ':pk': { S: userId },
          ':sk': { S: 'lifeword' },
        },
        ExpressionAttributeNames: { '#dynobase_type': 'type' },
      });
      let resp = await client.send(command);

      if (
        Object.keys(resp).includes('Items') &&
        resp.Items &&
        resp.Items.length > 0
      ) {
        return unmarshall(resp.Items[0]);
      }
    }

    /**
     * Fetch the user's values
     *
     * @param userId
     * @returns
     */
    public static async values(userId: string): Promise<Object | void> {
      const command = new QueryCommand({
        TableName: 'ferant-scores',
        KeyConditionExpression:
          'fid = :pk AND begins_with(#dynobase_type, :sk)',
        ExpressionAttributeValues: {
          ':pk': { S: userId },
          ':sk': { S: 'values' },
        },
        ExpressionAttributeNames: { '#dynobase_type': 'type' },
      });
      let resp = await client.send(command);

      if (
        Object.keys(resp).includes('Items') &&
        resp.Items &&
        resp.Items.length > 0
      ) {
        return unmarshall(resp.Items[0]);
      }
    }
  };

  /**
   *
   * @param email
   * @returns
   */
  public static async getByEmail(email: string): Promise<User | void> {
    const command = new QueryCommand({
      TableName: 'ferant-users',
      KeyConditionExpression: 'email = :pk',
      ExpressionAttributeValues: { ':pk': { S: email } },
      IndexName: 'email-fid-index',
    });

    let resp = await client.send(command);

    if (
      Object.keys(resp).includes('Items') &&
      resp.Items &&
      resp.Items.length > 0
    ) {
      return unmarshall(resp.Items[0]) as User;
    }
  }

  /**
   *
   */
  static Credentials = class {
    /**
     *
     * @param productId
     * @param clientId
     * @returns
     */
    public static async get(
      productId: string,
      clientId: string
    ): Promise<Users$Credentials$Get$Return | void> {
      const command = new GetItemCommand({
        TableName: 'integration-accounts',
        Key: marshall({ productId, clientId }),
      });
      let resp = await client.send(command);

      if (Object.keys(resp).includes('Item') && resp.Item) {
        return unmarshall(resp.Item) as Users$Credentials$Get$Return;
      }
    }

    /**
     *
     * @param userId
     * @param payload
     */
    public static async create(
      userId: string,
      payload: Users$Credentials$Create$Payload$Schema
    ): Promise<void> {
      const command = new PutItemCommand({
        TableName: 'ferant-users-api',
        Item: marshall(
          removeEmpty({
            fid: userId,
            ...payload,
          })
        ),
      });

      const response = await client.send(command);
    }
  };

  /**
   *
   */
  static Course = class {
    static Assigned = class {
      /**
       *
       * @param userId
       * @returns
       */
      public static async get(
        userId: string
      ): Promise<UserCourseAssigned | void> {
        const command = new GetItemCommand({
          TableName: 'ferant-courses-assigned',
          Key: marshall({ fid: userId }),
        });
        let resp = await client.send(command);

        if (Object.keys(resp).includes('Item') && resp.Item) {
          let res = unmarshall(resp.Item) as UserCourseAssigned;

          let updated = false;
          ['courses', 'starred'].forEach((type: string) => {
            (res as any)[type] = (res as any)[type]
              ? Object.values((res as any)[type])
              : [];

            if (isStringsArray((res as any)[type])) {
              (res as any)[type] = (
                (res as any)[type] as unknown as string[]
              ).map(
                (id: string): UserCourseAssignedDetails => ({
                  id: id,
                  last_viewed: new Date().toISOString(),
                })
              );
              updated = true;
            }
          });

          if (updated) {
            await UserService.Course.Assigned.update(res);
          }

          return res;
        }
      }

      /**
       *
       * @param payload
       */
      public static async create(payload: UserCourseAssigned): Promise<void> {
        const command = new PutItemCommand({
          TableName: 'ferant-courses-assigned',
          Item: marshall(removeEmpty(payload)),
        });

        const response = await client.send(command);
      }

      /**
       *
       * @param payload
       */
      public static async update(payload: UserCourseAssigned): Promise<void> {
        await UserService.Course.Assigned.create(payload);
      }

      public static async setup(
        email: string,
        courseId: string
      ): Promise<UserCourseAssigned | undefined> {
        const user: User | void = await UserService.getByEmail(email);
        if (!user) return undefined;

        const assignedCourses: UserCourseAssigned | void =
          await UserService.Course.Assigned.get(user.fid);

        const courses = assignedCourses?.courses || [];
        courses.push({ id: courseId, last_viewed: new Date().toISOString() });

        const starred = assignedCourses?.starred || [];

        return {
          fid: user.fid,
          courses: courses,
          starred: starred,
          created_at: assignedCourses?.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
    };
  };

  static Karma = class {
    /**
     *
     * @param userId
     * @param timeframe
     * @returns
     */
    public static async get(
      userId: string,
      timeframe: number = 365
    ): Promise<any[]> {
      const now = new Date();
      // Get activity for the past week
      now.setDate(now.getDate() - timeframe);
      const date = now.toISOString(); //.split('T', 1)[0];

      const command = new QueryCommand({
        TableName: 'karma-aggregate',
        KeyConditionExpression: 'fid = :pk AND #dynobase_date > :sk',
        ExpressionAttributeValues: {
          ':pk': { S: userId },
          ':sk': { S: date },
        },
        ExpressionAttributeNames: { '#dynobase_date': 'date' },
      });

      try {
        let resp = await client.send(command);

        if (
          Object.keys(resp).includes('Items') &&
          resp.Items &&
          resp.Items.length > 0
        ) {
          return resp.Items.map((item) => {
            const r = unmarshall(item);
            delete r.fid;
            return r;
          });
        }
      } finally {
        return [];
      }
    }

    public static async activity(
      userId: string,
      date: Date
    ): Promise<any[] | void> {
      const command = new QueryCommand({
        TableName: 'karma-commit',
        KeyConditionExpression: 'fid = :pk AND created_at > :sk',
        ExpressionAttributeValues: {
          ':pk': { S: userId },
          ':sk': { S: date.toISOString() },
        },
        IndexName: 'fid-created_at-index',
      });

      let resp = await client.send(command);

      if (
        Object.keys(resp).includes('Items') &&
        resp.Items &&
        resp.Items.length > 0
      ) {
        return resp.Items.map((item) => unmarshall(item));
      }
    }
  };
}
