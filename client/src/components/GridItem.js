import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";
import styled from "styled-components";

const GridItem = (props) => {
  const { _id, name, images, price } = props;
  const isDashboard = window.location.pathname.split("/").includes("dashboard");
  return (
    <Wrapper>
      <div className="image-container">
        <img src={images[0].url} alt={name} className="image-fit" />
        {isDashboard && (
          <Link to={`/dashboard/products/${_id}`} className="search-icon">
            <BiSearch />
          </Link>
        )}
      </div>
      <div className="product-info">
        <span className="fw-bold text-dark">{name}</span>
        <span>{formatPrice(price)}</span>
      </div>
    </Wrapper>
  );
};
export default GridItem;

const Wrapper = styled.article`
  .image-container {
    height: 13rem;
    overflow: hidden;
    position: relative;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: red;
    z-index: 5;
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: var(--light);
    background: var(--primary-dark-500);
    cursor: pointer;
    opacity: 0;
    transition: var(--transition);
  }
  .image-container:hover {
    opacity: 0.9;
  }
  .image-container:hover .search-icon {
    opacity: 1;
  }
  .product-info {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
