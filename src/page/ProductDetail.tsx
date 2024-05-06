import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Mouse from '../assets/Mouse.png';
import Keyboard from '../assets/Keyboard.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
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
  height: 44vh;
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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  margin-left: 22%;
  margin-top: 6%;
`;
const SetupItem = styled.span`
  //You may also like
  margin-left: 18.5%;
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
  margin-bottom: 3rem;
`;
const SetupObject = styled.div`
  height: 35vh;
  width: 26%;
  background-color: #2f2d2d;
  border-radius: 1rem;
  transition: 0.5s ease;
  box-shadow: 0px 0px 10px 0px #000000;
  &:hover {
    transform: scale(1.1);
  }
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
const ProductDetail = () => {
  const { id } = useParams();
  const [LikeProduct, setLikeProduct] = useState(
    localStorage.getItem(`liked_${id}`) === 'true'
  );
  const clickLikeProduct = () => {
    if (!LikeProduct) {
      wishProduct();
    } else {
      wishProductDelete();
    }
  };
  const wishProduct = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/products/wish/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      setLikeProduct(true); //아이콘 전환하려고 따로
      localStorage.setItem(`liked_${id}`, 'true');
    } catch (error) {
      console.log('에러', id);
    }
  };
  const wishProductDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/products/wish/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      setLikeProduct(false);
      localStorage.setItem(`liked_${id}`, 'false');
    } catch (error) {
      console.log('에러', id);
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <ProductInfoContainer>
        <ProductImage src={Keyboard} />
        <ProductDetails>
          <TitleContainer>
            <ProductName>Apple Magic Keyboard</ProductName>
            <Circle>
              <Button
                variant="contained"
                sx={{
                  borderRadius: '50%',
                  minWidth: '50px',
                  height: '50px',
                  bgcolor: 'grey.800',
                  color: 'red',
                  '&:hover': {
                    bgcolor: 'grey.700',
                  },
                }}
                onClick={clickLikeProduct}
              >
                {LikeProduct ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </Button>
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
        <ArrowBackIosNewIcon
          sx={{
            height: '50px',
            color: 'white',
            mr: 4,
            mb: 5,
          }}
        ></ArrowBackIosNewIcon>
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
        <ArrowForwardIosIcon
          sx={{
            height: '50px',
            color: 'white',
            ml: 4,
            mb: 5,
          }}
        ></ArrowForwardIosIcon>
      </RecommendProduct>
    </>
  );
};
export default ProductDetail;
