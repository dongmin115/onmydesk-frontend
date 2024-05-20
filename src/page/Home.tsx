import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/User';
import { userStore } from '../store';
import axios from 'axios';

// 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  item-align: center;
  align-items: center;
  margin: 0 auto; // 가운데 정렬
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 60vh;
  padding: 2% 0 2% 0;
  max-width: 1440px;
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
  height: 70%;
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
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #000000;
  transition: 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const HotGoodsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(30vh, auto);
  gap: 3vh;
  text-align: center;
  align-items: center;
  padding: 0% 5% 10vh 5%;
  height: fit-content;
`;

const SpanningItem4 = styled.div`
  grid-column: span 2;
  grid-row: span 2;
  height: 100%;
  width: 100%;
`;

const SpanningItem2 = styled.div`
  grid-column: span 2;
  height: 100%;
  width: 100%;
`;

const HotGoodsImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1px;
  box-shadow: 0px 0px 10px 0px #000000;
  transition: 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const HotDesk = (props) => {
  return (
    <>
      <HotDeskTitle>Today Hot Desk</HotDeskTitle>
      <HotDeskDescription>
        On My Desk에서 오늘의 인기있는 DESK를 확인해보세요!
      </HotDeskDescription>
      <HotDeskImageContainer>
        <HotDeskImageLayer>
          <HotDeskImage src={props.hotDesk[3].imageUrls} alt="hot-desk" />
        </HotDeskImageLayer>
        <HotDeskImageLayer>
          <HotDeskImage src={props.hotDesk[1].imageUrls} alt="hot-desk" />
        </HotDeskImageLayer>
        <HotDeskImageLayer>
          <HotDeskImage src={props.hotDesk[0].imageUrls} alt="hot-desk" />
        </HotDeskImageLayer>
        <HotDeskImageLayer>
          <HotDeskImage src={props.hotDesk[2].imageUrls} alt="hot-desk" />
        </HotDeskImageLayer>
        <HotDeskImageLayer>
          <HotDeskImage src={props.hotDesk[4].imageUrls} alt="hot-desk" />
        </HotDeskImageLayer>
      </HotDeskImageContainer>
    </>
  );
};

const HotGoods = ({ hotGoods }) => {
  return (
    <>
      <HotDeskTitle>인기있는 셋업 상품</HotDeskTitle>
      <HotDeskDescription>
        On My Desk에서 오늘의 인기있는 셋업 상품을 확인해보세요!
      </HotDeskDescription>
      <HotGoodsContainer>
        {hotGoods.length > 0 && (
          <SpanningItem4>
            <HotGoodsImage src={hotGoods[0].img} alt="hot-desk" />
          </SpanningItem4>
        )}
        {hotGoods.length > 1 && (
          <SpanningItem2>
            <HotGoodsImage src={hotGoods[1].img} alt="hot-desk" />
          </SpanningItem2>
        )}
        {hotGoods.length > 2 && (
          <SpanningItem2>
            <HotGoodsImage src={hotGoods[2].img} alt="hot-desk" />
          </SpanningItem2>
        )}
        {hotGoods.length > 3 &&
          hotGoods
            .slice(3)
            .map((item, index) => (
              <HotGoodsImage key={index} src={item.img} alt="hot-desk" />
            ))}
      </HotGoodsContainer>
    </>
  );
};

export default function Home() {
  const { setName, setNickname, setEmail } = userStore();
  const [hotDesk, setHotDesk] = useState([]);
  const [hotGoods, setHotGoods] = useState([]);

  useEffect(() => {
    // 로그인 후 홈페이지로 이동하면 유저 정보를 가져옴
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setName(response.data.name);
        setNickname(response.data.nickname);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchHotDesk = async (): Promise<void> => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts', {
          params: {
            page: 1,
            limit: 5,
            criteria: 2,
          },
        });
        setHotDesk(response.data.data);
      } catch (error) {
        console.log('Error', error);
      }
    };
    const fetchHotGoods = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products', {
          params: {
            page: 1,
            limit: 11,
            criteria: 3,
          },
        });
        setHotGoods(response.data.data);
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchHotDesk();
    fetchHotGoods();
    fetchUserInfo();
  }, []);
  return (
    <Container>
      <Navbar />
      <SectionContainer>
        {hotDesk.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <HotDesk hotDesk={hotDesk} />
        )}
      </SectionContainer>
      <SectionContainer>
        {hotGoods.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <HotGoods hotGoods={hotGoods} />
        )}
      </SectionContainer>
    </Container>
  );
}
