import styled from 'styled-components';
import Navbar from '../components/Navbar';

// 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  item-align: center;
  width: 100wh;
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
  position: relative;
  width: 100%;
  height: 70%;
`;

const HotDeskImageLayer = styled.div`
  position: absolute;
  top: 50%;
  width: 30%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;

  &:nth-child(1) {
    left: 5%;
    z-index: 1;
  }

  &:nth-child(2) {
    left: 20%;
    z-index: 2;
    transfrom-origin: center center;
    transform: translateY(-50%) scale(1.2);
  }

  &:nth-child(3) {
    left: 50%;
    z-index: 3;
    transform: translateX(-50%) translateY(-50%) scale(1.4);
  }

  &:nth-child(4) {
    right: 20%;
    z-index: 2;
    transfrom-origin: center center;
    transform: translateY(-50%) scale(1.2);
  }

  &:nth-child(5) {
    right: 5%;
    z-index: 1;
  }
`;
const HotDeskImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #000000;
  transition: 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const HotGoodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  width: 30%;
  height: 100%;
`;

const HotGoodsTitle = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
`;

const HotGoodsImage = styled.img`
  width: 100%;
  height: 80%;
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
      <Navbar />
      <SectionContainer>
        <HotDeskTitle>Today Hot Desk</HotDeskTitle>
        <HotDeskDescription>
          On My Desk에서 오늘의 인기있는 DESK를 확인해보세요!
        </HotDeskDescription>
        <HotDeskImageContainer>
          <HotDeskImageLayer>
            <HotDeskImage
              src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png"
              alt="hot-desk"
            />
          </HotDeskImageLayer>
          <HotDeskImageLayer>
            <HotDeskImage
              src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png"
              alt="hot-desk"
            />
          </HotDeskImageLayer>
          <HotDeskImageLayer>
            <HotDeskImage
              src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png"
              alt="hot-desk"
            />
          </HotDeskImageLayer>
          <HotDeskImageLayer>
            <HotDeskImage
              src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png"
              alt="hot-desk"
            />
          </HotDeskImageLayer>
          <HotDeskImageLayer>
            <HotDeskImage
              src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png"
              alt="hot-desk"
            />
          </HotDeskImageLayer>
        </HotDeskImageContainer>
      </SectionContainer>
      <SectionContainer>
        <HotDeskTitle>인기있는 셋업 상품</HotDeskTitle>
        <HotDeskDescription>
          On My Desk에서 오늘의 인기있는 셋업 상품을 확인해보세요!
        </HotDeskDescription>
        <HotGoodsContainer>
          <HotGoodsImage
            src="https://i.ibb.co/55RX0m5/Get-the-We-Heart-It-app-1.png"
            alt="hot-desk"
          />
          <HotGoodsTitle>1등 상품 이름</HotGoodsTitle>
        </HotGoodsContainer>
      </SectionContainer>
    </Container>
  );
}
