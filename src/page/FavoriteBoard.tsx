import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { Button, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { getFavorite } from '../api/Favorite';

// 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  item-align: center;
  justify-content: center;
`;

const SetupBoardMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 18vh;
  padding: 0 5% 0 5%;
`;

const SetupBoardTitle = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  font-weight: 300;
  color: #ffffff;
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

const ButtonContainer = styled.div`
  position: absolute;
  right: 5%;
  align-items: center;
`;

export default function FavoriteBoard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    getFavorite();
  }, []);
  return (
    <Container>
      <Navbar />
      <SetupBoardMenu>
        <SetupBoardTitle>좋아요 누른 게시물</SetupBoardTitle>
        <ButtonContainer>
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
        </ButtonContainer>
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
