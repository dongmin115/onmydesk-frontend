import axios from 'axios';

import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import {
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { KeyboardArrowDown, RemoveRedEye } from '@mui/icons-material';
import { Pagination } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { favorite } from '../api/Favorite';

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
  align-items: center;
  width: 100wh;
`;

const SetupBoardMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 18vh;
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

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 200;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  margin-bottom: 0;
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

export default function SetupBoard() {
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pagenation, setPagenation] = useState(1);
  const open = Boolean(anchorEl);
  const [currentSortOption, setCurrentSortOption] = useState('최신순');

  useEffect(() => {
    // 컴포넌트가 마운트될 때 최신순으로 포스트를 검색하여 가져오기
    searchPosts(1); // criteria를 1로 설정하여 최신순으로 검색
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 호출

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchPosts = async (page: number, criteria: number): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts', {
        params: {
          page: page,
          limit: 9,
          criteria: criteria,
        },
      });
      setPosts(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handlePageChange = (event, page, criteria) => {
    setPagenation(page);
    searchPosts(page, criteria);
  };

  const handleSortOptionClick = (
    sortOption: number,
    sortText: string
  ): void => {
    handleClose();
    searchPosts(sortOption);
    setCurrentSortOption(sortText);
  };

  const renderPosts = () => {
    return posts.map((post: any) => (
      <Link to={`/PostDetail/${post.id}`} style={{ textDecoration: 'none' }}>
        <ImageContainer>
          <SetupBoardImage
            key={post.id}
            src={'https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png'}
            alt={post.title}
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
                    favorite(post.id);
                  }}
                >
                  <FavoriteBorder color="success" />
                </IconButton>
                <p>{post.heartCount}</p>
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
                <p>{post.viewCount}</p>
              </div>
            </div>
          </Caption>
        </ImageContainer>
        <Title>{post.title}</Title>
      </Link>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
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
            <Link to="/Post_registration">
              <Button endIcon={<TvIcon />}>
                <SetupBoardParagraph>셋업공유</SetupBoardParagraph>
              </Button>
            </Link>
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
              {currentSortOption}
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
              <MenuItem onClick={() => handleSortOptionClick(1, '최신순')}>
                최신순
              </MenuItem>
              <MenuItem
                onClick={() => handleSortOptionClick(2, '좋아요 많은 순')}
              >
                좋아요 많은 순
              </MenuItem>
              <MenuItem onClick={() => handleSortOptionClick(3, '조회순')}>
                조회순
              </MenuItem>
            </Menu>
          </div>
        </SetupBoardMenu>
        <SetupBoardContainer>{renderPosts()}</SetupBoardContainer>
        <Pagination
          count={10} // 전체 페이지 수
          page={pagenation} // 현재 페이지
          color="primary"
          onChange={handlePageChange}
          sx={{
            '& .MuiPaginationItem-root': { color: 'white', fontSize: '1vw' },
          }}
          style={{ marginBottom: '3vw' }}
          // 페이지 변경 핸들러
        />
      </Container>
    </ThemeProvider>
  );
}
