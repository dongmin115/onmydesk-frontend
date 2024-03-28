import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 이미지 컨테이너 스타일
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 30vh;
`;

// 텍스트 오버레이 스타일
const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  font-weight: medium;
  color: white;
`;

// 텍스트 스타일
const Text = styled.p`
  margin: 0; /* 기본 마진 제거 */
`;

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
`;

// 스타일이 적용된 링크 컴포넌트 정의
const StyledLink = styled(Link)`
  color: #c1c1c1;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    transition: 0.5s ease;
    color: #0085ff;
  }
`;
export default function Navbar() {
  return (
    <>
      <ImageContainer>
        <img
          src="https://i.ibb.co/55RX0m5/Get-the-We-Heart-It-app-1.png"
          alt="main-image"
          style={{ width: '100%', height: '100%' }}
        />
        <TextOverlay>
          <Text>On My Desk!</Text>
        </TextOverlay>
      </ImageContainer>
      <Menu>
        <MenuButton>
          <StyledLink to="/">Home</StyledLink>
        </MenuButton>

        <MenuButton>
          <StyledLink to="/setupboard">셋업게시판</StyledLink>
        </MenuButton>

        <MenuButton>
          <StyledLink to="/mypage">상품 게시판</StyledLink>
        </MenuButton>

        <MenuButton>
          <StyledLink to="/mypage">마이페이지</StyledLink>
        </MenuButton>
      </Menu>
    </>
  );
}
