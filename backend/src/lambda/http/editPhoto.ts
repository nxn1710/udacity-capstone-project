import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { editPhoto } from '../../helpers/photos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    const photoKey = event.pathParameters.photoKey
    const body: { photoName: string } = JSON.parse(event.body)

    const userPhoto = await editPhoto(userId, photoKey, body.photoName)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        userPhoto
      })
    }
  }
)
handler.use(
  cors({
    credentials: true
  })
)
