import { useState } from 'react'
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom"
import styled from 'styled-components'

import Upload from './Upload'
import UploadedImg from './UploadedImg'

const Main = styled.div`
  background: #FAFAFB;
  min-height: 100vh;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
`

const Frame = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
`

const App = () => {
  let history = useHistory()
  const [imgPreviewUri, setImgPreviewUri] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleError = (msg) => {
    setError(msg)
    setTimeout(() => {
      setError(false)
    }, 5000)
  }

  const getImg = (id) => {
    fetch(`/upload/${id}`)
      .then(response => response.json())
      .then(data => {
        setDownloaded(data)
        setLoading(false)
      })
      .catch(e => {
        history.push('/')
        setLoading(false)
        handleError('File not found')
      })
  }

  const handleFile = (event) => {
    event.preventDefault()
    let files
    if(event.target.files) files = event.target.files
    else if(event.dataTransfer.files) files = event.dataTransfer.files
    else return
    if(!files
      || files.length === 0) return
    if(!files[0].type
      .match(/^image\/(jpeg|jpg|pjpeg|png)$/)) {
        handleError('Allowed file formats .jpeg .jpg .pjpeg .png')
        return null
    }
    if(files[0].size > 524288) {
        handleError('Max file size 0.5MB');
        return null
    }
    setUploading(true)
    setImgFile(files[0])
    setImgPreviewUri(URL.createObjectURL(files[0]))
  }

  const onDragOver = (event) => {
    event.dataTransfer.dropEffect = 'move'
    event.preventDefault()
  }

  const uploadPicture = (e) => {
    setLoading(true)
    e.preventDefault()
    const formData = new FormData()

    formData.append('img', imgFile)
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(result => {
      setLoading(false)
      history.push(`/${result.id}`)
    })
    .catch(error => {
      handleError('Error. Please try again later...');
      setLoading(false)
    })
  }

  return (
    <Main className="App">
      <Frame>
        <Switch>
          <Route path="/" exact>
            <Upload
              error={error}
              handleFile={handleFile}
              onDragOver={onDragOver}
              imgPreviewUri={imgPreviewUri}
              setImgPreviewUri={setImgPreviewUri}
              uploadPicture={uploadPicture}
              loading={loading}
            />
          </Route>
          <Route path="/:id">
            <UploadedImg
              loading={loading}
              downloaded={downloaded}
              getImg={getImg}
              setLoading={setLoading}
              uploading={uploading}
            />
          </Route>
        </Switch>
      </Frame>
      <Footer>Łukasz Raubo @ Devchallenges.io</Footer>
    </Main>
  )
}

export default App
