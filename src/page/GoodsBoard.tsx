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
  margin-left: 5%;
  margin-right: 5%;
`;

const Flexbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 18vh;
  margin-right: 5%;
  margin-left: 5%;
`;

const Category = function ({
  setLoading,
  setProducts,
  setError,
  fetchProductList,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [criteria, setCriteria] = useState(1); // 기본 정렬 기준을 1(인기순)로 설정
  const [criteriaLabel, setCriteriaLabel] = useState('인기순'); // 기본 라벨 설정

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:8080/api/products/search',
        { params: { query: searchQuery } }
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error searching products:', error);
      setError('상품 검색에 실패했습니다.');
      setLoading(false);
    }
  };

  const handleMenuItemClick = (criteriaValue, label) => {
    setCriteria(criteriaValue);
    setCriteriaLabel(label); // 라벨 업데이트
    handleClose();
    fetchProductList(setProducts, setLoading, setError, criteriaValue);
  };

  return (
    <GoodsBoardMenu>
      <Flexbox
        style={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
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
          style={{ minWidth: 200, whiteSpace: 'nowrap' }}
        />

        <GoodsBoardTitle>셋업에 사용된 상품을 둘러보세요!</GoodsBoardTitle>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          size="large"
          style={{
            minWidth: 120,
            whiteSpace: 'nowrap',
            color: '#d3d3d3',
            fontSize: '1rem',
          }}
          endIcon={<KeyboardArrowDown />}
        >
          {criteriaLabel} {/* 버튼 라벨 업데이트 */}
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
          <MenuItem onClick={() => handleMenuItemClick(1, '인기순')}>
            인기순
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick(2, '좋아요')}>
            좋아요
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick(3, '조회수')}>
            조회수
          </MenuItem>
        </Menu>
      </Flexbox>
    </GoodsBoardMenu>
  );
};

export default function GoodsBoard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProductList = async (setProducts, setLoading, setError) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('상품을 불러오는데 실패했습니다.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList(setProducts, setLoading, setError);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <Container>
        <Category
          setLoading={setLoading}
          setProducts={setProducts}
          setError={setError}
          fetchProductList={fetchProductList} // 함수를 prop으로 전달
        />
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <SetupBoardContainer>
            {products.map((product) => (
              <GoodsItem key={product.id} product={product} id={product.id} />
            ))}
          </SetupBoardContainer>
        )}
      </Container>
    </ThemeProvider>
  );
}
