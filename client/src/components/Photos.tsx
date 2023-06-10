import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { deletePhoto, getPhotos } from '../api/photos-api'
import { Photo } from '../types/Photo'
import { Button, Label } from 'semantic-ui-react'

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
      <h3>Please Click on a photo to start edit its name</h3>
      <Button onClick={() => history.push('/photos/add')} color="yellow">
        Add a photo
      </Button>

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
              </div>{' '}
              <div>
                <Label
                  style={{ marginRight: 10, paddingTop: 13, paddingBottom: 10 }}
                >
                  Photo name: {photo.photoName ?? 'NO_NAME'}
                </Label>
                <Button
                  oonClick={() => {
                    handleDeletePhoto(photo.photoKey)
                  }}
                  color="red"
                >
                  Delete
                </Button>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Photos
