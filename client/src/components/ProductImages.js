import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
const ProductImages = (props) => {
  const { images } = props;
  const [mainImg,setMainImg] = useState(images?.[0]?.url);
  return (
    <Wrapper fluid>
      <Row className="mb-3">
        <img src={mainImg} alt="main-image" className="image-fit main-img" />
      </Row>
      <Row>
        {
          images?.map((image,index)=>(
            <Col key={index}>
              <img src={image.url} alt="prod-img" className={`image-fit gallery-img ${image.url === mainImg ? "active":""}`} onClick={()=>setMainImg(image.url)}/>
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
