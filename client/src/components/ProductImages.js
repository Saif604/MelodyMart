import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
const ProductImages = (props) => {
  const { images } = props;
  const [mainImg,setMainImg] = useState(0);
  return (
    <Wrapper fluid>
      <Row className="mb-3">
        <img src={images[mainImg]?.url} alt="main-image" className="image-fit main-img" />
      </Row>
      <Row>
        {
          images.map(({imageID,url})=>(
            <Col key={imageID}>
              <img src={url} alt="prod-img" className={`image-fit gallery-img ${imageID===mainImg ? "active":""}`} onClick={()=>setMainImg(imageID)}/>
            </Col>
          ))
        }
      </Row>
    </Wrapper>
  );
};
export default ProductImages;

const Wrapper = styled(Container)`
  img {
    border-radius: 4px;
  }
  .main-img{
    border-radius: 8px;
    padding:0;
    height:23rem;
  }
  .gallery-img{
    cursor: pointer;
    opacity: 0.8;
    height:5rem;
  }
  .active{
    border: 4px solid var(--primary-dark-500);
    opacity: 1;
  }

  @media (max-width:768px){
    .main-img{
      height:18rem;
    }
    .gallery-img{
      height:4rem;
    }
  }
`;
