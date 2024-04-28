import axios from 'axios';

import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Pagination } from '@mui/material';

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
    return posts.map((post) => (
      <Link to={`/PostDetail/${post.id}`}>
        <button style={{ border: 'none', background: 'transparent' }}>
          <SetupBoardImage
            key={post.id}
            src={'https://i.ibb.co/4jKpMfL/2024-03-25-3-45-22.png'}
            alt={post.title}
          />
        </button>
      </Link>
    ));
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
  );
}
