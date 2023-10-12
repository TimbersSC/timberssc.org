module.exports = {
  tables: [
    {
      TableName: 'ferant-blog-articles',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
        { AttributeName: 'category', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'category', AttributeType: 'S' },
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      data: [
        {
          id: '2023-09-27-new-ui',
          category: 'changelog', // can be multiple
          author: 'Michael Podsiadly',
          authorEmail: 'mpodsiadly@ferant.io',
          published: '2023-09-27',
          edited: '2023-09-27',
          status: 'PUBLISHED',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'category-published',
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      ],
    },
  ],
  basePort: 8000,
};
