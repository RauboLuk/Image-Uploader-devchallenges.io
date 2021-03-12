import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components';

import Upload from './Upload';

const Main = styled.div`
  background: #FAFAFB;
  min-height: 100vh;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

// const Button = styled.p`${theme.button}`

function App() {
  const [imgPreviewUri, setImgPreviewUri] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleError = (msg) => {
    setError(msg)
    setTimeout(() => {
      setError(false)
    }, 5000)
  }

  const downloadImg = () => {
    fetch('http://localhost:5000/upload')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setDownloaded(data)
      })
  }

  const uploadFileButton = (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    console.log('dt', event.target.dataTransfer);
    if(!event.target.files
      || event.target.files.length === 0) return;
    setImgFile(event.target.files[0]);
    setImgPreviewUri(URL.createObjectURL(event.target.files[0]));
  }
  
  // TODO: TypeError: this._drop is not a function at Object.handleEvent
  const prepareFile = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    // TODO add maxsize
    if(!file.type
      .match(/^image\/(jpeg|jpg|pjpeg|png)$/)) {
        handleError('Allowed file formats .jpeg .jpg .pjpeg .png');
        return null;
    }
    setImgFile(file);
    setImgPreviewUri(URL.createObjectURL(file));
  }

  const onDragOver = (event) => {
    event.dataTransfer.dropEffect = 'move';
    event.preventDefault();
  }

  const sendPicture = (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();

    formData.append('img', imgFile);
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      setLoading(false)
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false)
    });
  }

  return (
    <Router>
      <Main className="App">
        <Frame>
          <Switch>
            <Route path="/" exact>
              <Upload
                error={error}
                prepareFile={prepareFile}
                onDragOver={onDragOver}
                imgPreviewUri={imgPreviewUri}
                sendPicture={sendPicture}
                setImgPreviewUri={setImgPreviewUri}
                uploadFileButton={uploadFileButton}
                loading={loading}
              />
            </Route>
            <Route path="/:id">
              <p>hi</p>
            </Route>
          </Switch>
        </Frame>
        <div>
          <button onClick={downloadImg}>downloadImg</button>
          {downloaded && <img alt="downloaded" src={`data:image/*;base64,${Buffer.from(downloaded.items.img.data.data).toString('base64')}`}/>}
        </div>
        <footer>created by LR - devChallenges.io</footer>
      </Main>
    </Router>
  );
}

export default App;
