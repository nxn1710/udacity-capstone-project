import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { cors, httpErrorHandler } from 'middy/middlewares'
import * as middy from 'middy'
import { deleteTodo } from '../../helpers/photos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const photoKey = event.pathParameters.photoKey
    const userId = getUserId(event)

    await deleteTodo(userId, photoKey)

    return {
      statusCode: 202,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({})
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
