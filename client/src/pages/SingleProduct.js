import { useParams } from "react-router-dom"
import styled from "styled-components";
import { Row,Col } from "react-bootstrap";
const SingleProduct = () => {
    const {id} = useParams();
  return (
    <div className="section section-center page">
        <p>{id}</p>
    </div>
  )
}
export default SingleProduct;

const Wrapper = styled.main`
    
`