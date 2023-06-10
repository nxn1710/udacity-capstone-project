import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { createLogger } from '../utils/logger'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { UserPhoto } from '../models/userPhoto'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('photoAccess')

export class PhotoAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly photosTable = process.env.PHOTOS_TABLE
  ) {}

  async getPhotos(userId: string): Promise<UserPhoto[]> {
    try {
      logger.info('Getting all photos for user', userId)
      const result = await this.docClient
        .query({
          TableName: this.photosTable,
          KeyConditionExpression: 'userId = :userId',
          ExpressionAttributeValues: {
            ':userId': userId
          }
        })
        .promise()
      logger.info('Getting all photos for user successfully', userId, result)

      return result.Items as UserPhoto[]
    } catch (error) {
      logger.error('Failed to get all photos for user', error, userId)
    }
  }

  async deleteTodo(userId: string, photoKey: string): Promise<void> {
    try {
      logger.info('Deleting a photo for user', userId, photoKey)
      await this.docClient
        .delete({
          TableName: this.photosTable,
          Key: { userId, photoKey }
        })
        .promise()
      logger.info(`photo ${photoKey} deleted for user`, userId)
    } catch (error) {
      logger.error('Failed to delete photo', error, userId, photoKey)
    }
  }

  async savePhoto(uesrPhotoDto: UserPhoto): Promise<UserPhoto> {
    try {
      logger.info('Saving a photo for user', uesrPhotoDto)

      await this.docClient
        .put({
          TableName: this.photosTable,
          Item: uesrPhotoDto
        })
        .promise()
      logger.info('Saving a photo for user successfully', uesrPhotoDto)

      return uesrPhotoDto
    } catch (error) {
      logger.error('Failed to save a photo for user', error, uesrPhotoDto)
      return null
    }
  }

  async editPhoto(uesrPhotoDto: {
    userId: string
    photoKey: string
    photoName: string
  }): Promise<{ userId: string; photoKey: string; photoName: string }> {
    try {
      logger.info('Editing a photo for user', uesrPhotoDto)

      await this.docClient
        .update({
          TableName: this.photosTable,
          Key: {
            userId: uesrPhotoDto.userId,
            photoKey: uesrPhotoDto.photoKey
          },
          UpdateExpression: 'set #n = :n',
          ExpressionAttributeNames: { '#n': 'photoName' },
          ExpressionAttributeValues: {
            ':n': uesrPhotoDto.photoName
          }
        })
        .promise()
      logger.info('Editing a photo for user successfully', uesrPhotoDto)

      return uesrPhotoDto
    } catch (error) {
      logger.error('Failed to save a photo for user', error, uesrPhotoDto)
      return null
    }
  }
}
