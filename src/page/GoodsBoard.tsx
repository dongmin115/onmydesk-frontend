import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { KeyboardArrowDown } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

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
  width: 100wh;
`;

const GoodsBoardMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  padding: 0 5% 2% 5%;
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
  padding: 0% 5% 10vh 5%;
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
  width: 80vw;
`;

const Flexbox2 = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
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

const GoodsItem = function () {
  return (
    <GoodsBoardFlexbox>
      <SetupBoardImage src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png" />
      <GoodsBoardInfo>
        <GoodsBoardInfoFlexbox>
          <p>맥북 프로 16인치 2021 M1 맥스</p>
          <FavoriteButton>
            <IconButton>
              <FavoriteIcon color="success" />
            </IconButton>
            <p>12</p>
          </FavoriteButton>
        </GoodsBoardInfoFlexbox>
        <GoodsBoardInfoFlexbox>
          <p>최저가 19,000원</p>
        </GoodsBoardInfoFlexbox>
      </GoodsBoardInfo>
    </GoodsBoardFlexbox>
  );
};

const Categoray = function () {
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
          style={{ width: '18%' }}
        >
          전체
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: '18%' }}
        >
          키보드
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: '18%' }}
        >
          마우스
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: '18%' }}
        >
          노트북
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: '18%' }}
        >
          모니터
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: '18%' }}
        >
          데스크
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: '18%' }}
        >
          스피커
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: '18%' }}
        >
          기타
        </Button>
      </Flexbox>
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
    </GoodsBoardMenu>
  );
};
export default function GoodsBoard() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Navbar />
        <GoodsBoardTitle>셋업에 사용된 상품을 둘러보세요!</GoodsBoardTitle>
        <Categoray />
        <SetupBoardContainer>
          <GoodsItem />
          <GoodsItem />
          <GoodsItem />
          <GoodsItem />
          <GoodsItem />
          <GoodsItem />
          <GoodsItem />
          <GoodsItem />
          <GoodsItem />
        </SetupBoardContainer>
      </Container>
    </ThemeProvider>
  );
}
