import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { editPhoto } from '../api/photos-api'

const EditPhoto = ({ idToken }: { idToken: string }) => {
  const params = useParams<{ photoKey: string }>()
  const [photoName, setPhotoName] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const history = useHistory()
  function handleEditPhoto() {
    setLoading(true)
    if (!photoName || !photoName.length)
      return alert('Please enter a photo name')

    editPhoto(idToken, params.photoKey, photoName)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        alert('Failed to edit photo. Maybe the photo name is too short')
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div>
      <p>Add or edit photo name</p>{' '}
      <input
        value={photoName}
        type="text"
        onChange={(e) => {
          setPhotoName(e.target.value)
        }}
      />
      <button disabled={loading} onClick={handleEditPhoto}>
        Confirm
      </button>
    </div>
  )
}

export default EditPhoto
