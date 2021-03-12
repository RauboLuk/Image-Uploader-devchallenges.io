import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Header = styled.header`
  margin-bottom: 20px;
`

const Title = styled.h1`
  color: #4F4F4F;
  font-size: 18px;
  line-height: 27px;
`;

const Subtitle = styled.p`
  color: ${props => props.color ? 'firebrick' : '#828282'};
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
  margin: 1em;
`
const Button = styled.p`
  font-family: 'Noto Sans';
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.035em;
  background: ${props => props.color === 'cancel' ? 'firebrick' : '#2F80ED'};
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  color: #FFFFFF;
`

const Upload = ({
  error,
  prepareFile,
  onDragOver,
  imgPreviewUri,
  sendPicture,
  setImgPreviewUri,
  uploadFileButton,
  loading
}) => {
  if(loading) return (
    <p>loading</p>
  )
  return (
    <>
      <Header>
        <Title>
          Upload your image
        </Title>
        <Subtitle color={error || undefined}>
        {error ? error : 'File should be Jpeg, Png,...'}
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
      {!!imgPreviewUri
        ? <div>
            <Button onClick={sendPicture}>Upload</Button>
            <Button onClick={() =>{setImgPreviewUri(null)}} color="cancel">Cancel</Button>
          </div>
        : <>
          <Or>
            Or
          </Or>
          <label htmlFor="button">
            <Button>Choose a file</Button>
          </label>
          <input hidden id="button" type="file" accept="image/*" onChange={uploadFileButton}/>
        </>
      }
    </>
  )
}

export default Upload