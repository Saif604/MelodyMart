import styled, { keyframes } from "styled-components";
import { Row, Col } from "react-bootstrap";
import HeroImg from "../assets/images/hero.svg";
import { GridItem } from "../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../features/Products/productsSlice.js";
import { PiMusicNoteFill } from "react-icons/pi";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const { featuredProducts } = useSelector((state) => state.products);
  const featured = featuredProducts?.slice(0, 3);
  return (
    <Wrapper>
      <section className="hero">
        <div className=" section-center hero-center">
          <h2>
            MelodyMart
            <span className="musics">
              <PiMusicNoteFill />
              <PiMusicNoteFill />
            </span>
          </h2>
          <p>
            Discover a seamless shopping experience designed for music
            enthusiasts. Explore a wide range of musical instruments with
            powerful search and filtering options.
          </p>
          <ul>
            <h6>Sign up now to:</h6>
            <li>Manage your profile effortlessly.</li>
            <li>Add items to your cart and place orders quickly.</li>
            <li>Leave reviews, edit them, or even delete them.</li>
            <li>Access your order history with detailed insights.</li>
          </ul>
          <p>
            For admin users, efficiently manage products, users, and reviews
            through a dedicated admin portal.{" "}
          </p>
          <p>
            <span className="musics me-2">
              <PiMusicNoteFill />
              <PiMusicNoteFill />
            </span>
            Log in today and experience a world where music meets technology!
          </p>
        </div>
      </section>
      {featured?.length > 2 && (
        <section className="featured section">
          <div className="section-center">
              <div className="section-title">
              <h2>featured</h2>
            </div>
            <Row>
              {featured.map(({ _id, ...item }) => (
                <Col key={_id} sm={6} md={4}>
                  <GridItem _id={_id} {...item} />
                </Col>
              ))}
            </Row>
          </div>
        </section>
      )}
    </Wrapper>
  );
};
export default Home;

const vibrate = keyframes`
  0% { transform: translate(0, 0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(2px, 2px); }
  100% { transform: translate(0, 0); }
`;
const Wrapper = styled.main`
  color: var(--light);
  p {
    color: inherit;
  }
  .hero {
    min-height: calc(100vh - var(--nav-height));
    background: url(${HeroImg}) center/cover no-repeat scroll;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hero-center {
    max-width: var(--fixed-width);
    margin: 2rem 0;
    .musics {
      color: var(--primary-light-500);
      animation: ${vibrate} 0.5s infinite;
      display: inline-block;
    }
    li {
      list-style: decimal;
      margin-left: 1rem;
    }
  }

  //Featured Section
  .featured {
    background: var(--primary-dark-100);
    span{
      color:var(--dark);
      font-weight: 700;
    }
  }
  .section-title {
    text-align: center;
    margin-bottom: 2rem;
    h2 {
      text-transform: capitalize;
      color: var(--dark);
    }
  }
`;
