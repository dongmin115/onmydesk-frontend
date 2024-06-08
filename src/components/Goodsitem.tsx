import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const GoodsBoardFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  drop-shadow: 0 0 0.5rem #000000;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.5s;
  }
`;

const GoodsBoardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #3d3d3d;
  border-radius: 0 0 1rem 1rem;
  height: fit-content;
  width: 100%;
  color: #ffffff;
  align-items: start;
`;

const GoodsBoardInfoFlexbox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  item-align: center;
  text-align: center;
  padding: 0 5% 0 5%;
`;

const SetupBoardImage = styled.img`
  width: 100%;
  height: 20vh;
  border-radius: 1rem 1rem 0 0;
`;

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
function GoodsItem({ product, id }) {
  const navigate = useNavigate();

  const [wishes, setWishes] = useState(product.wished);

  const searchProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/products/${id}`,

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        }
      );
      setWishes(response.data.data.product.wished);
    } catch (error) {
      console.log('에러');
    }
  };

  useEffect(() => {
    searchProduct();
  }, [wishes]);

  const postWish = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_KEY}/products/wish/${product.id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        }
      );
      setWishes(true); // 상태 업데이트
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const deleteWish = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_KEY}/products/wish/${product.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        }
      );
      setWishes(false); // 상태 업데이트
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const toggleLike = async () => {
    try {
      if (wishes) {
        await deleteWish();
      } else {
        await postWish();
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  return (
    <GoodsBoardFlexbox onClick={() => navigate(`/productdetail/${id}`)}>
      <SetupBoardImage src={product.img} alt={product.productName} />
      <GoodsBoardInfo>
        <GoodsBoardInfoFlexbox>
          <p>{product.productName}</p>
          {wishes ? (
            <IconButton
              onClick={(e) => {
                e.preventDefault(); // Link의 기본 동작을 막음
                e.stopPropagation(); // 이벤트 전파를 막음
                toggleLike();
              }}
            >
              <Favorite color="success" />
            </IconButton>
          ) : (
            <IconButton
              onClick={(e) => {
                e.preventDefault(); // Link의 기본 동작을 막음
                e.stopPropagation(); // 이벤트 전파를 막음
                toggleLike();
              }}
            >
              <FavoriteBorder color="success" />
            </IconButton>
          )}
        </GoodsBoardInfoFlexbox>
        <GoodsBoardInfoFlexbox>
          <p>{`최저가 ${formatPrice(product.lprice)}원`}</p>
        </GoodsBoardInfoFlexbox>
      </GoodsBoardInfo>
    </GoodsBoardFlexbox>
  );
}

export default GoodsItem;
