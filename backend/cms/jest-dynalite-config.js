module.exports = {
  tables: [
    {
      TableName: 'users',
      KeySchema: [{ AttributeName: 'fid', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'fid', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      data: [],
    },
    {
      TableName: 'ferant-courses-details',
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      data: [],
    },
    {
      TableName: 'ferant-courses-enrollment',
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      data: [],
    },
    {
      TableName: 'ferant-courses-assigned',
      KeySchema: [{ AttributeName: 'fid', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'fid', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      data: [],
    },
    {
      TableName: 'integration-accounts',
      KeySchema: [
        { AttributeName: 'productId', KeyType: 'HASH' },
        { AttributeName: 'clientId', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'productId', AttributeType: 'S' },
        { AttributeName: 'clientId', AttributeType: 'S' },
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      data: [],
    },
  ],
  basePort: 8000,
};
