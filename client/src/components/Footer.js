import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <p className="footer-text">&copy; {new Date().getFullYear()} all rights reserved</p>
    </Wrapper>
  );
}
export default Footer;

const Wrapper = styled.footer`
  .footer-text{
    min-height: var(--nav-height);
    background: var(--dark);
    display: flex;
    align-items: center;
    font-weight: 700;
    color: var(--light);
    justify-content: center;
    margin: 0;
    text-transform: capitalize;
  }
`