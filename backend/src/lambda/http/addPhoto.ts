import 'source-map-support/register'

import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { createLogger } from '../../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)

const bucketName = process.env.S3_BUCKET
const urlExpiration = Number(process.env.SIGNED_URL_EXPIRATION)
const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { addPhoto } from '../../helpers/photos'

const logger = createLogger('generateUploadUrl')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    const Key = uuid.v4()
    const uploadUrl = s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key,
      Expires: urlExpiration
    })
    logger.info('Generated upload URL:', {
      uploadUrl
    })
    const userPhoto = await addPhoto(userId, Key)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        uploadUrl,
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
