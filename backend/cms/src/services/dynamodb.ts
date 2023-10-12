import { DynamoDB } from '@aws-sdk/client-dynamodb'

const config = { region: 'us-east-2' }

export const client = new DynamoDB({
  ...config,
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: 'local',
  }),
})
