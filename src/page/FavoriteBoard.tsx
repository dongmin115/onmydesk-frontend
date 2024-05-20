import styled from 'styled-components';
import Navbar from '../components/Navbar';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
} from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import { useEffect, useState } from 'react';
import {
  FavoriteBorder,
  KeyboardArrowDown,
  RemoveRedEye,
} from '@mui/icons-material';
import { favorite, getFavorite } from '../api/Favorite';
import { Link } from 'react-router-dom';

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
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 200;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  margin-bottom: 0;
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

const ButtonContainer = styled.div`
  position: absolute;
  right: 5%;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const SetupBoardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  drop-shadow: 0 0 0.5rem #000000;
  transition: transform 0.5s;

  /* 이미지 위에 마우스를 올렸을 때 약간 확대합니다 */
  ${ImageContainer}:hover & {
    transform: scale(1.05);
    filter: brightness(0.3);
  }
`;

const Caption = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.3s;

  /* 호버 시 투명도 변경 */
  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

export default function FavoriteBoard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [favoritePosts, setFavoritePosts] = useState([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const response = await getFavorite();
        setFavoritePosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorite();
  }, []);
  return (
    <ThemeProvider theme={theme}>
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
          {favoritePosts.map((e) => (
            <Link to={`/PostDetail/${e.id}`} style={{ textDecoration: 'none' }}>
              <ImageContainer>
                <SetupBoardImage
                  key={e.id}
                  src={e.thumbnailUrl}
                  alt={e.title}
                />
                <Caption>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1.5rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault(); // Link의 기본 동작을 막음
                          e.stopPropagation(); // 이벤트 전파를 막음
                          favorite(e.id);
                        }}
                      >
                        <FavoriteBorder color="success" />
                      </IconButton>
                      <p>{e.heartCount}</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <RemoveRedEye />
                      <p>{e.viewCount}</p>
                    </div>
                  </div>
                </Caption>
              </ImageContainer>
              <Title>{e.title}</Title>
            </Link>
          ))}
        </SetupBoardContainer>
      </Container>
    </ThemeProvider>
  );
}
