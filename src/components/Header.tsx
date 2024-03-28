import styled from 'styled-components';

const NavContainer = styled.div`
  background-color: #545454;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.h1`
  color: #ffffff;
  font-family: 'Explora-Regular';
  font-size: 3rem;
`;

function Header() {
  return (
    <NavContainer>
      <Logo>On My Desk!</Logo>
    </NavContainer>
  );
}

export default Header;
