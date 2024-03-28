import { Button, Menu, MenuItem } from '@mui/material';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useState } from 'react';

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
  height: 100%;
  border-radius: 1rem;
  drop-shadow: 0 0 0.5rem #000000;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.5s;
  }
`;
const Flexbox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 70vw;
`;

const Flexbox2 = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  justify-content: end;
`;

export default function GoodsBoard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container>
      <Navbar />
      <GoodsBoardTitle>셋업에 사용된 상품을 둘러보세요!</GoodsBoardTitle>
      <GoodsBoardMenu>
        <Flexbox>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: '15%' }}
          >
            전체
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: '15%' }}
          >
            키보드
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: '15%' }}
          >
            마우스
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: '15%' }}
          >
            모니터
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: '15%' }}
          >
            데스크
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: '15%' }}
          >
            스피커
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: '15%' }}
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
      <SetupBoardContainer>
        <SetupBoardImage src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png" />
        <SetupBoardImage src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png" />
        <SetupBoardImage src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png" />
        <SetupBoardImage src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png" />
        <SetupBoardImage src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png" />
        <SetupBoardImage src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png" />
        <SetupBoardImage src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png" />
        <SetupBoardImage src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png" />
        <SetupBoardImage src="https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png" />
      </SetupBoardContainer>
    </Container>
  );
}
