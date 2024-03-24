import styled from 'styled-components';

// 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  item-align: center;
  width: 100wh;
`;
// 이미지 컨테이너 스타일
const ImageContainer = styled.div`
  position: relative;
  width: 100wh;
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
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    transition: 0.5s ease;
    color: #0085ff;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 60vh;
  padding: 2% 0 2% 0;
`;

const HotDeskTitle = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
`;

const HotDeskDescription = styled.p`
  font-size: 1rem;
  color: #7b7878;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 2%;
`;

const HotDeskImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
`;

const HotDeskImage = styled.img`
  width: 40%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #000000;
  transition: 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
export default function Home() {
  return (
    <Container>
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
        <MenuButton>Home</MenuButton>
        <MenuButton>셋업 게시판</MenuButton>
        <MenuButton>상품 게시판</MenuButton>
        <MenuButton>마이 페이지</MenuButton>
      </Menu>
      <SectionContainer>
        <HotDeskTitle>Today Hot Desk</HotDeskTitle>
        <HotDeskDescription>
          On My Desk에서 오늘의 인기있는 DESK를 확인해보세요!
        </HotDeskDescription>
        <HotDeskImageContainer>
          <HotDeskImage
            src="https://i.ibb.co/55RX0m5/Get-the-We-Heart-It-app-1.png"
            alt="hot-desk"
          />
        </HotDeskImageContainer>
      </SectionContainer>
      <SectionContainer>
        <HotDeskTitle>인기있는 셋업 상품</HotDeskTitle>
      </SectionContainer>
    </Container>
  );
}
