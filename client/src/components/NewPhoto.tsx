import React from 'react'
import { useHistory } from 'react-router-dom'
import { addPhoto, uploadFile } from '../api/photos-api'
import { Button } from 'semantic-ui-react'

const NewPhoto = ({ auth }) => {
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
    await uploadFile(uploadUrl, files[0])
    setIsUploading(false)
    history.push('/')
  }

  return (
    <div>
      <Button disabled={!files} onClick={handleUploadFile} color="green">
        Upload
      </Button>
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

export default NewPhoto
