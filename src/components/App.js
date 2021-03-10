import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

import { theme } from '../theme';

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
  min-width: 402px;
  min-height: 469px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 36px 32px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.header`
  margin-bottom: 20px;
`

const Title = styled.h1`
  color: #4F4F4F;
  font-size: 18px;
  line-height: 27px;
`;

const Subtitle = styled.p`
  color: #828282;
  font-size: 10px;
  line-height: 15px;
`;

const DragNDrop = styled.div`
  background: #F6F8FB;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 338px;
  height: 224.4px;
  border-radius: 12px;
  border: 1px dashed;
  border-color: ${props => props.isPicture ?
  "green" : "#97BEF4"}
`;

const DnDText = styled.p`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.035em;
  color: #BDBDBD;
`

const Preview = styled.img`
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
  border-radius: 12px;
`;

const Or = styled.p`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.035em;
  color: #BDBDBD;
`

const Button = styled.p`${theme.button}`

function App() {
  const [imgPreviewUri, setImgPreviewUri] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [error, setError] = useState(false);

  const handleError = (msg) => {
    setError(msg)
    setTimeout(() => {
      setError(false)
    }, 5000)
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
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <Main className="App">
      <Frame>
        <Header>
          {error && error}
          <Title>
            Upload your image
          </Title>
          <Subtitle>
            File should be Jpeg, Png,...
          </Subtitle>
        </Header>
        <DragNDrop onDrop={prepareFile} onDragOver={onDragOver} isPicture={!!imgPreviewUri}>
            {!!imgPreviewUri
              ? <Preview id="output" width="200" alt="Preview" src={imgPreviewUri}/>
              : <>
                <Icon name='picture' size='massive' />
                <DnDText>Drag & Drop your image here</DnDText>
              </>
            }
        </DragNDrop>
        <Or>
          Or
        </Or>
        <label htmlFor="button">
          <Button>Choose a file</Button>
        </label>
        <input hidden id="button" type="file" accept="image/*" onChange={uploadFileButton}/>
      </Frame>
      <button onClick={sendPicture}>send</button>
      <footer>created by LR - devChallenges.io</footer>
    </Main>
  );
}

export default App;
