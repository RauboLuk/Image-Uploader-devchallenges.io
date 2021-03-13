import styled from 'styled-components';
import { Icon, Input } from 'semantic-ui-react';
import { useRef } from 'react';

const Frame = styled.div`
  min-width: 402px;
  padding: 36px 32px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
`

const Header = styled.header`
  margin-bottom: 20px;
`

const Title = styled.h1`
  color: #4F4F4F;
  font-size: 18px;
  line-height: 27px;
`

const DragNDrop = styled.div`
  background: #F6F8FB;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 338px;
  height: 224.4px;
  border-radius: 12px;
  margin-bottom: 25px;
`

const Preview = styled.img`
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
  border-radius: 12px;
`

const Loading = styled.div`
  padding: 36px 32px;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.035em;
  text-align: start;
`
const Loader = styled.div`
  margin-top: 30px;
  width: 340px;
  height: 6px;
  background: #F2F2F2;
  border-radius: 8px;
`
const LoaderBar = styled.div`
  height: 6px;
  background: #2F80ED;
  border-radius: 8px;
  animation: loading 2.2s ease-out infinite;
  position: relative;

  @keyframes loading {
    0% {
      left: 0%;
      right: 100%;
      width: 0;
    }
    10% {
      left: 0%;
      right: 75%;
      width: 25%;
    }
    90% {
      right: 0%;
      left: 75%;
      width: 25%;
    }
    100% {
      left: 100%;
      right: 0%;
      width: 0%;
    }
  }
`

const UploadedImg = ({
  loading,
  downloaded
}) => {
  const linkInput = useRef(null)

  const handleCopy = (e) => {
    e.preventDefault()
    linkInput.current.select()
    document.execCommand("copy")
  }
  // TODO check what if there is no item i db
  // if(!downloaded) return (
  //   <Loading>Loading...
  //     <Loader>
  //       <LoaderBar />
  //     </Loader>
  //   </Loading>
  // )
  return (
    <Frame>
      <Header>
      <Icon name='check circle' size='big' color="green" />
        <Title>
          Uploaded Successfully!
        </Title>
      </Header>
      <DragNDrop>
        {downloaded?.items?.img
          ?
          <Preview id="output" width="200" alt="Preview" src={`data:image/*;base64,${Buffer.from(downloaded.items.img.data.data).toString('base64')}`}/>
          :
          null
        }
      </DragNDrop>
      {/* Semantic ui input */}
      <div className="ui action input">
        <input
          id="copyText"
          type="text"
          value="http://ww.short.url/c0opq"
          onChange={null}
          ref={linkInput}
        />
        <button className="ui blue right labeled icon button" onClick={handleCopy}>
          <i className="copy icon"></i>
          Copy
        </button>
      </div>
    </Frame>
  )
}

export default UploadedImg