import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 메뉴 스타일
const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #3d3d3d;
  width: 100%;
  height: 5vh;
`;

const MenuButton = styled.button`
  color: #c1c1c1;
  background-color: #3d3d3d;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    transition: 0.5s ease;
    color: #0085ff;
  }
`;
export default function Navbar() {
  return (
    <Menu>
      <MenuButton>
        <Link to="/">Home</Link>
      </MenuButton>
      <MenuButton>
        <Link to="/setupboard">셋업게시판</Link>
      </MenuButton>
      <MenuButton>상품 게시판</MenuButton>
      <MenuButton>
        <Link to="/mypage">마이페이지</Link>
      </MenuButton>
    </Menu>
  );
}
