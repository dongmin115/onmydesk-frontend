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
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import GoodsItem from '../components/Goodsitem';

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
// 상품 목록을 불러오는 함수
const fetchProductList = async (setProducts, setLoading, setError) => {
  setLoading(true);
  try {
    const response = await axios.get('http://localhost:8080/api/products', {});
    setProducts(response.data.data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching products:', error);
    setError('상품을 불러오는데 실패했습니다.');
    setLoading(false);
  }
};

// 상품 검색을 처리하는 함수
const searchProducts = async (query, setProducts, setLoading, setError) => {
  setLoading(true);
  try {
    const response = await axios.get(
      'http://localhost:8080/api/products/search',
      { params: { query } }
    );
    setProducts(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Error searching products:', error);
    setError('상품 검색에 실패했습니다.');
    setLoading(false);
  }
};

export default function GoodsBoard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProductList(setProducts, setLoading, setError); // 초기 상품 목록 불러오기
  }, []);

  const handleSearch = () => {
    searchProducts(searchQuery, setProducts, setLoading, setError);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <TextField
        id="search-field"
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
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <SetupBoardContainer>
            {Array.isArray(products) &&
              products.map((product) => (
                <GoodsItem key={product.id} product={product} id={product.id} />
              ))}
          </SetupBoardContainer>
        )}
      </Container>
    </ThemeProvider>
  );
}
