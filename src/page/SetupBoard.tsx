import styled from 'styled-components';
import Navbar from '../components/Navbar';
import {
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';

// 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  item-align: center;
  width: 100wh;
`;

const SetupBoardMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 10vh;
`;

const SetupBoardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  margin: 0;
`;

const SetupBoardParagraph = styled.p`
  font-size: 1rem;
  color: #d3d3d3;
  text-align: center;
  margin: 0;
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

export default function SetupBoard() {
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
      <SetupBoardMenu>
        <TextField
          id="standard-basic"
          variant="standard"
          placeholder="검색어를 입력해주세요."
          color="primary"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <SetupBoardTitle>데스크탑 셋업을 공유해보세요!</SetupBoardTitle>
        <div>
          <Button endIcon={<TvIcon />}>
            <SetupBoardParagraph>셋업공유</SetupBoardParagraph>
          </Button>
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
            <MenuItem onClick={handleClose}>최신순</MenuItem>
            <MenuItem onClick={handleClose}>인기순</MenuItem>
            <MenuItem onClick={handleClose}>가격순</MenuItem>
          </Menu>
        </div>
      </SetupBoardMenu>
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
