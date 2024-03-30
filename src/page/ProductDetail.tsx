import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Mouse from '../assets/Mouse.png';
import Keyboard from '../assets/Keyboard.png';
import Heart from '../assets/Heart.png';
import LeftArrow from '../assets/Leftarrow.png';
import Arrow from '../assets/Arrows.png';
const ProductInfoContainer = styled.div`
  //상부 전체를 묶는 컨테이너
  display: flex;
  justify-content: center;
  margin-left: 12.5%;
  margin-top: 6%;
`;

const ProductImage = styled.img`
  //상품 이미지
  background-size: cover;
  width: 27vw;
  height: 42vh;
  border-radius: 5%;
  margin-top: 4.3%;
`;

const ProductDetails = styled.div`
  //상품의 판매처,가격,상세 정보를 묶는 컨테이너
  width: 40%;
  padding: 2%;
  margin-left: 2%;
`;
const TitleContainer = styled.div`
  //상품이름과 하트를 묶는 컨테이너
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  //하트 이미지를 담는 원
  height: 6vh;
  width: 10%;
  border-radius: 4rem;
  background-color: #2f2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const HeartImg = styled.img`
  height: 60%;
  width: 60%;
  border-radius: 4rem;
  margin: auto;
`;

const ProductName = styled.h1`
  //상품 이름
  font-size: 1.8em;
  color: #ffffff;
  font-family: 'Kiwi Maru';
  margin-right: 20px;
`;

const ProductDetail1 = styled.p`
  //상품 스펙
  color: #ffffff;
  font-size: 0.6rem;
  width: 30vw;
  height: 3vh;
  margin-top: 4%;
`;

const ProductDetail2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 29vw;
  height: 25vh;
  color: #ffffff;
  margin-top: 10%;
`;
const PriceList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PriceItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ShopName = styled.span`
  margin-right: 5%;
  width: 7vw;
  height: 4vh;
  margin-top: 3%;
`;

const Price = styled.span`
  font-family: 'Kiwi Maru';
  margin-left: 6px;
  margin-bottom: 10%;
`;

const Line = styled.div`
  width: 55vw;
  height: 0.1vw;
  background-color: #ffffff;
  margin-left: 23%;
  margin-top: 6%;
`;

const SetupItem = styled.span`
  //You may also like
  margin-left: 19%;
  color: #ffffff;
  width: 100%;
  height: 2.4vh;
  font-family: 'Kiwi Maru';
  font-size: 1.4rem;
`;

const Recommend = styled.div`
  //You may also like를 묶는 컨테이너
  margin-top: 1%;
  margin-left: 5%;
`;

const RecommendProduct = styled.div`
  width: 100%;
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const SetupObjectContainer = styled.div`
  //상품들을 묵는 컨테이너
  width: 55vw;
  height: 35vh;
  display: flex;
  justify-content: space-between;
`;

const SetupObject = styled.div`
  height: 35vh;
  width: 26%;

  background-color: #2f2d2d;
`;
const ObjectImage = styled.img`
  height: 70%;
  width: 100%;
  border-radius: 1rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;
const ObjectNameContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
`;
const ObjectName = styled.span`
  width: 100%;
  height: 100%;
  color: #ffffff;
  font-family: 'Kiwi Maru';
  margin-left: 26%;
  margin-top: 12%;
`;
const LeftArrowButton = styled.img`
  width: 4vw;
  height: 5vh;
  margin-right: 4%;
  cursor: pointer;
`;

const RightArrow = styled.img`
  width: 2vw;
  height: 3vh;
  margin-left: 5%;
  cursor: pointer;
`;

const ProductDetail = () => {
  return (
    <>
      <Navbar></Navbar>
      <ProductInfoContainer>
        <ProductImage src={Keyboard} />
        <ProductDetails>
          <TitleContainer>
            <ProductName>Apple Magic Keyboard</ProductName>
            <Circle>
              <HeartImg src={Heart} />
            </Circle>
          </TitleContainer>
          <ProductDetail1>
            연결방식 : 무선 | 전송방식 : 블루투스 | 특수기능키 : 기능키,
            멀티미디어키 | 단자 : 라이트닝, USB Type-C | 무게 : 243g | 케이블 :
            분리형케이블 | 배터리 : 배터리내장
          </ProductDetail1>
          <ProductDetail2>
            <PriceList>
              <PriceItem>
                <ShopName>신세계몰</ShopName>
                <Price>162,000</Price>
              </PriceItem>
              <PriceItem>
                <ShopName>신세계몰</ShopName>
                <Price>162,000</Price>
              </PriceItem>
              <PriceItem>
                <ShopName>신세계몰</ShopName>
                <Price>162,000</Price>
              </PriceItem>
              <PriceItem>
                <ShopName>신세계몰</ShopName>
                <Price>162,000</Price>
              </PriceItem>
              <PriceItem>
                <ShopName>신세계몰</ShopName>
                <Price>162,000</Price>
              </PriceItem>
            </PriceList>
          </ProductDetail2>
        </ProductDetails>
      </ProductInfoContainer>
      <Line></Line>
      <Recommend>
        <SetupItem>You may also like</SetupItem>
      </Recommend>
      <RecommendProduct>
        <LeftArrowButton src={LeftArrow}></LeftArrowButton>

        <SetupObjectContainer>
          <SetupObject>
            <ObjectImage src={Mouse}></ObjectImage>
            <ObjectNameContainer>
              <ObjectName>Magic Mouse</ObjectName>
            </ObjectNameContainer>
          </SetupObject>
          <SetupObject>
            <ObjectImage src={Mouse}></ObjectImage>
            <ObjectNameContainer>
              <ObjectName>Magic Mouse</ObjectName>
            </ObjectNameContainer>
          </SetupObject>
          <SetupObject>
            <ObjectImage src={Mouse}></ObjectImage>
            <ObjectNameContainer>
              <ObjectName>Magic Mouse</ObjectName>
            </ObjectNameContainer>
          </SetupObject>
        </SetupObjectContainer>

        <RightArrow src={Arrow}></RightArrow>
      </RecommendProduct>
    </>
  );
};

export default ProductDetail;
