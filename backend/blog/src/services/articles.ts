import {
  GetItemCommand,
  PutItemCommand,
  BatchGetItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb';

import _ from 'lodash';

import { client } from './dynamodb';

export class Courses {
  /**
   * Get a specific article
   * @param {STRING} courseId
   * @returns
   */
  public static async get(courseId: string): Promise<any | void> {
    const command = new GetItemCommand({
      TableName: 'ferant-blog-articles',
      Key: marshall({ id: courseId }),
    });
    let resp = await client.send(command);

    if (Object.keys(resp).includes('Item') && resp.Item) {
      return unmarshall(resp.Item);
    }
  }

  /**
   * Get articles for a specific category
   * @param {STRING} authorEmail
   * @returns
   */
  public static async getForAuthor(authorEmail: string): Promise<any | void> {
    const command = new QueryCommand({
      TableName: 'ferant-blog-articles',
      KeyConditionExpression: 'authorEmail = :pk',
      ExpressionAttributeValues: { ':pk': { S: authorEmail } },
      IndexName: 'authorEmail-id-index',
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

  /**
   * Get articles for a specific category
   * @param {STRING} category
   * @returns
   */
  public static async getForCategory(category: string): Promise<any | void> {
    const command = new QueryCommand({
      TableName: 'ferant-blog-articles',
      KeyConditionExpression: 'category = :pk',
      ExpressionAttributeValues: { ':pk': { S: category } },
      IndexName: 'category-id-index',
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

  /**
   * Get articles for a specific category
   * @param {STRING} category
   * @returns
   */
  public static async getForCategoryWithinDate(
    category: string
  ): Promise<any | void> {
    const command = new QueryCommand({
      TableName: 'ferant-blog-articles',
      KeyConditionExpression: 'category = :pk',
      ExpressionAttributeValues: { ':pk': { S: category } },
      IndexName: 'category-id-index',
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
}
