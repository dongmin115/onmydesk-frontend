import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const FavoriteButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

  return (
    <GoodsBoardFlexbox onClick={() => navigate(`/productdetail/${id}`)}>
      <SetupBoardImage src={product.img} alt={product.productName} />
      <GoodsBoardInfo>
        <GoodsBoardInfoFlexbox>
          <p>{product.productName}</p>
          <FavoriteButton>
            <IconButton>
              <FavoriteIcon color="success" />
            </IconButton>
            <p>{product.price}</p>
          </FavoriteButton>
        </GoodsBoardInfoFlexbox>
        <GoodsBoardInfoFlexbox>
          <p>{`최저가 ${formatPrice(product.lprice)}원`}</p>
        </GoodsBoardInfoFlexbox>
      </GoodsBoardInfo>
    </GoodsBoardFlexbox>
  );
}

export default GoodsItem;
