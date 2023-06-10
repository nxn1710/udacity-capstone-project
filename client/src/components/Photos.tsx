import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { deletePhoto, getPhotos } from '../api/photos-api'
import { Photo } from '../types/Photo'

const Photos = ({ auth }) => {
  const history = useHistory()
  const [photos, setPhotos] = React.useState<Photo[]>([])
  const [loading, setLoading] = React.useState(true)
  const [count, setCount] = React.useState(0)
  useEffect(() => {
    getPhotos(auth.idToken).then((data) => {
      setLoading(false)
      setPhotos(data)
    })
  }, [auth.idToken, count])

  async function handleDeletePhoto(key: string) {
    deletePhoto(auth.idToken, key).then(() => {
      setCount(count + 1)
    })
  }
  return (
    <div>
      <h1> Photos:</h1>
      <h3>Click on a photo to start editing its name</h3>
      {!!loading && <p>Loading...</p>}
      <div>
        {photos.map((photo) => {
          return (
            <>
              <div
                key={photo.photoKey}
                style={{
                  cursor: 'pointer',
                  marginBottom: '3rem'
                }}
              >
                <img
                  onClick={() => {
                    history.push(`/photos/edit/${photo.photoKey}`)
                  }}
                  width={300}
                  height={300}
                  src={photo.photoUrl}
                  alt={photo.photoName}
                />
                <button
                  onClick={() => {
                    handleDeletePhoto(photo.photoKey)
                  }}
                >
                  Delete
                </button>
              </div>{' '}
              <p> {photo.photoName}</p>
            </>
          )
        })}
      </div>
      <div>
        <button onClick={() => history.push('/photos/add')}>Add a photo</button>
      </div>
    </div>
  )
}

export default Photos
