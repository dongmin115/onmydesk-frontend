import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { KeyboardArrowDown } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0085FF',
    },
    secondary: {
      main: '#4F4F4F',
    },
    success: {
      main: '#E24E4E',
    },
  },
});

// 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  item-align: center;
  max-width: 1440px;
  margin: 0 auto;
  padding-bottom: 5vh;
`;

const GoodsBoardMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  padding: 0;
`;

const GoodsBoardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  width: 100%;
  margin: 4.5vh 0 4.5vh 0;
`;

const SetupBoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(30vh, auto);
  gap: 3vh;
  text-align: center;
  align-items: center;
  padding: 0;
  height: fit-content;
`;

const SetupBoardImage = styled.img`
  width: 100%;
  height: 20vh;
  border-radius: 1rem 1rem 0 0;
`;
const Flexbox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-bottom: 2rem;
`;

const Flexbox2 = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: end;
`;

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

const GoodsItem = function ({ product }) {
  return (
    <GoodsBoardFlexbox>
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
          <p>{`최저가 ${product.price}원`}</p>
        </GoodsBoardInfoFlexbox>
      </GoodsBoardInfo>
    </GoodsBoardFlexbox>
  );
};

const Category = function () {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <GoodsBoardMenu>
      <Flexbox>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ flex: 1 }}
        >
          전체
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ flex: 1 }}
        >
          키보드
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ flex: 1 }}
        >
          마우스
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ flex: 1 }}
        >
          노트북
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ flex: 1 }}
        >
          모니터
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ flex: 1 }}
        >
          데스크
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ flex: 1 }}
        >
          스피커
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ flex: 1 }}
        >
          기타
        </Button>
        <Flexbox2>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            size="large"
            style={{ color: '#d3d3d3', fontSize: '1rem' }}
            endIcon={<KeyboardArrowDown />}
          >
            정렬기준
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>인기순</MenuItem>
            <MenuItem onClick={handleClose}>가격순</MenuItem>
          </Menu>
        </Flexbox2>
      </Flexbox>
    </GoodsBoardMenu>
  );
};
export default function GoodsBoard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query = '') => {
    console.log(`Fetching products with query: ${query}`);
    setLoading(true);
    try {
      let url = 'http://localhost:8080/api/products';
      const params = { display: 10 };
      if (query) {
        url += '/search'; // 검색어가 있을 때만 search endpoint 호출
        params.query = query;
      }
      const response = await axios.get(url, { params });
      console.log('Response data:', response.data);
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('상품을 불러오는데 실패했습니다.');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProducts(searchQuery);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <TextField
        id="standard-basic"
        variant="standard"
        placeholder="검색어를 입력해주세요."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        color="primary"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch} style={{ padding: 0 }}>
                <SearchIcon color="primary" style={{ cursor: 'pointer' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Container>
        <GoodsBoardTitle>셋업에 사용된 상품을 둘러보세요!</GoodsBoardTitle>
        <Category />
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <SetupBoardContainer>
            {products.map((product) => (
              <GoodsItem key={product.id} product={product} />
            ))}
          </SetupBoardContainer>
        )}
      </Container>
    </ThemeProvider>
  );
}
