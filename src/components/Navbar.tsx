import styled from 'styled-components';

const NavContainer = styled.div`
  background-color: #545454;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const Logo = styled.h1`
  color: #ffffff;
  font-family: 'Explora-Regular';
  font-size: 3rem;
`;

const Navbar = () => {
  return (
    <NavContainer>
      <Logo>On My Desk!</Logo>
    </NavContainer>
  );
};

export default Navbar;
