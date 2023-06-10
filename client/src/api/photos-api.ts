import { apiEndpoint } from '../config'
import { Photo } from '../types/Photo'
import Axios from 'axios'

export async function getPhotos(idToken: string): Promise<Photo[]> {
  console.log('Fetching todos')

  const response = await Axios.get(`${apiEndpoint}/photos`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
  console.log('Photos:', response.data)
  return response.data
}

export async function deletePhoto(
  idToken: string,
  photoKey: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/photos/${photoKey}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
}

export async function addPhoto(idToken: string): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/photos`, '', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function editPhoto(
  idToken: string,
  photoKey: string,
  photoName: string
): Promise<void> {
  await Axios.put(
    `${apiEndpoint}/photos/${photoKey}`,
    { photoName },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
}

export async function uploadFile(
  uploadUrl: string,
  file: Buffer
): Promise<any> {
  const response = await Axios.put(uploadUrl, file)
  return response.data
}
