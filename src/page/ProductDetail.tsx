import Navbar from '../components/Navbar';
import styled from 'styled-components';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  height: 60vh;
  border-radius: 5%;
  margin-top: 6.3%;
`;
const ProductDetails = styled.div`
  //상품의 판매처,가격,상세 정보를 묶는 컨테이너
  width: 40%;
  padding: 2%;
  margin-left: 2%;
  margin-top: 2%;
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
  margin-bottom: 6px;
`;

const ShopName = styled.a`
  margin-right: 5%;
  width: 14vw;
  height: 6vh;
  margin-top: 3%;
  color: rgba(52, 154, 248, 1);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
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
  margin-bottom: 5%;
`;

const PriceContainer = styled.div`
  max-height: 1000px;
  overflow-y: auto;
`;
const ProductDetail = () => {
  const { id } = useParams();
  const [productDetailData, setProductDetailData] = useState(null);
  const [LikeProduct, setLikeProduct] = useState(false);

  const clickLikeProduct = () => {
    if (!LikeProduct) {
      wishProduct();
    } else {
      wishProductDelete();
    }
  };

  const searchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        }
      );
      setProductDetailData(response.data);
      setLikeProduct(response.data.data.product.wished);
      console.log(response.data);
    } catch (error) {
      console.log('에러');
    }
  };

  useEffect(() => {
    searchProduct();
  }, []);

  const wishProduct = async () => {
    try {
      await axios.post(`http://localhost:8080/api/products/wish/${id}`, null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      setLikeProduct(true);
    } catch (error) {
      console.log('에러', id);
    }
  };

  const wishProductDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/products/wish/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      setLikeProduct(false);
    } catch (error) {
      console.log('에러', id);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <>
      <Navbar />
      <ProductInfoContainer>
        <ProductImage src={productDetailData?.data.product.img} />
        <ProductDetails>
          <TitleContainer>
            <ProductName>
              {productDetailData?.data.product.productName}
            </ProductName>
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
            {productDetailData?.data.product.category1}
            {productDetailData?.data.product.category2}
          </ProductDetail1>
          <ProductDetail2>
            <PriceContainer>
              <PriceList>
                {productDetailData?.data.pages.map((page) => (
                  <PriceItem key={page.id}>
                    <ShopName
                      href={page.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {page.storeName}
                    </ShopName>
                    <Price>{formatPrice(page.price)}</Price>
                  </PriceItem>
                ))}
              </PriceList>
            </PriceContainer>
          </ProductDetail2>
        </ProductDetails>
      </ProductInfoContainer>
      <Line />
    </>
  );
};

export default ProductDetail;
