import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Dimmer, Loader, Icon } from 'semantic-ui-react';


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
  width: 402px;
  height: 469px;
  border-radius: 3%;
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
  width: 100%;
  height: 50%;
  border-radius: 3%;
  border: 1px dashed #97BEF4;
`;

const DnDText = styled.p`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.035em;
  color: #BDBDBD;
`

const Or = styled.p`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.035em;
  color: #BDBDBD;
`

const Button = styled.input`${theme.button}`

function App() {
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(picture);
  }, [picture]);

  const uploadFileButton = (event) => {
    event.preventDefault();
    console.log(event.target.files);
    if(!event.target.files
      || event.target.files.length === 0) return;
    setPicture(URL.createObjectURL(event.target.files[0]));
    setLoading(true);
  }
  
  const uploadFile = (event) => {
    event.preventDefault();
    console.log('onDragOver', event.dataTransfer.files[0]);
    setPicture(URL.createObjectURL(event.dataTransfer.files[0]));
    setLoading(true);
  }

  const onDragOver = (event) => {
    event.dataTransfer.dropEffect = 'move';
    event.preventDefault();
  }

  return (
    <Main className="App">
      <Frame>
        <Header>
          <Title>
            Upload your image
          </Title>
          <Subtitle>
            File should be Jpeg, Png,...
          </Subtitle>
        </Header>
        <DragNDrop onDrop={uploadFile} onDragOver={onDragOver}>
            {loading
              ? <img id="output" width="200" alt="Preview" src={picture}/>
              : <>
                <Icon name='picture' size='massive' />
                <DnDText>Drag & Drop your image here</DnDText>
              </>
            }
        </DragNDrop>
        <Or>
          Or
        </Or>
        <Button type="file" accept="image/*" onChange={uploadFileButton}/>
      </Frame>
      <footer>created by LR - devChallenges.io</footer>
    </Main>
  );
}

export default App;
