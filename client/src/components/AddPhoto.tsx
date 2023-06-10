import React from 'react'
import { useHistory } from 'react-router-dom'
import { addPhoto, uploadFile } from '../api/photos-api'

const AddPhoto = ({ auth }) => {
  const [files, setFiles] = React.useState<any>()
  const history = useHistory()
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setFiles(files)
  }
  const [isUploading, setIsUploading] = React.useState(false)
  async function handleUploadFile() {
    if (!files) return
    setIsUploading(true)

    const uploadUrl = await addPhoto(auth.idToken)
    console.log(uploadUrl)
    console.log(files[0])
    await uploadFile(uploadUrl, files[0])
    setIsUploading(false)
    history.push('/')
  }

  return (
    <div>
      <button disabled={!files} onClick={handleUploadFile}>
        Upload
      </button>
      {isUploading ? <p>Uploading...</p> : null}
      <input
        type="file"
        accept="image/*"
        placeholder="Image to upload"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default AddPhoto
