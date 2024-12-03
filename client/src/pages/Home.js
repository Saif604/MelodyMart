import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import HeroImg from "../assets/images/hero.svg";
import { GridItem } from "../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../features/AllProducts/productsSlice.js";
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
        <div className="section-center">
          <Row className="hero-content">
            <Col md={{ span: 6, offset:2 }}>
              <h3 className="hero-heading">Welcome</h3>
              <p className="hero-info">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                cupiditate dolorem provident minus amet! Ipsam, placeat
                similique. Distinctio accusamus necessitatibus quae, aperiam
                commodi cumque error, non explicabo, impedit ullam quam. Quidem
                eos quae libero accusantium neque necessitatibus nesciunt
                repellat harum dignissimos odit optio eaque, nobis tempora nihil
                quibusdam tempore quo?
              </p>
            </Col>
          </Row>
        </div>
      </section>
      {featured?.length > 2 && (
        <section className="section featured">
          <div className="section-center">
            <div className="section-title">
              <h2>featured</h2>
            </div>
            <Row>
              {featured.map(({ _id, ...item }) => (
                <Col key={_id}>
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

const Wrapper = styled.main`
  .hero {
    background: url(${HeroImg}) center/cover no-repeat scroll;
  }
  .hero-content {
    padding: 1rem 0;
    min-height: calc(100vh - var(--nav-height));
    align-items: center;
  }
  .hero-heading {
    color: var(--light);
  }
  .hero-info {
    color: var(--gray-400);
  }

  /* featured */
  .featured {
    background: var(--primary-dark-100);
  }
  .section-title {
    text-align: center;
    margin-bottom: 2rem;
    h2 {
      text-transform: capitalize;
    }
  }
`;
