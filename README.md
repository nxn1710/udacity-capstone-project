## Project Components

- Restful API (Lambda Functions, API Gateway and DynamoDb)
- Client (React)

## How to run the application

### Deploy Backend

To deploy an application run the following commands (You should have aws credentials configured yourself first):

```bash
cd backend
yarn install
sls deploy -v
```

### Update frontend configuration

```js
const apiId = 'v9vruqc5v5'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-wsbkqmyqiscn8v1f.us.auth0.com',
  clientId: 'EdS6j21e2HLfRTrNNNeo24C4VRxb5eU9',
  callbackUrl: 'http://localhost:3000/callback'
}
```

### Frontend

```bash
cd client
yarn install
yarn start
```

## Current Deplyment details

API Endpoint

```
https://v9vruqc5v5.execute-api.us-east-1.amazonaws.com/dev/photos
```
