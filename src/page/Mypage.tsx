import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomModal from '../components/Modal.tsx';
import Dropdown from '../components/Dropdown.tsx';
import profile from '../assets/image/mypage/profile-image.svg';
import plusbox from '../assets/image/mypage/plusbox.svg';
import Navbar from '../components/Navbar.tsx';
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from '../store.ts';
import { deleteUser, putUserInfo } from '../api/User.ts';
import { FavoriteBorder, RemoveRedEye, Title } from '@mui/icons-material';
import { favorite, getFavorite } from '../api/Favorite.ts';

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

// 스타일드 컴포넌트 생성
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 2%;
  padding-bottom: 2%;
  max-width: 1440px;
  margin: 0 auto; /* 화면 가운데 정렬 */
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
`;

const TitleText = styled.p`
  font-size: 1.5rem;
  color: #d3d3d3;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  width: 100%;
  height: 13vh;
  background: #3d3d3d;
  border-radius: 1vw;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding-left: 5%;
  width: 30%;
`;

const Name = styled.span`
  font-size: 1.5rem; // 임시 이름의 글꼴 크기
  text-align: center;
`;

const Email = styled.span`
  font-size: 1rem;
  text-align: center;
  color: #7b7878;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1vw;
  padding-right: 5%;
`;

const SetupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3rem;
  gap: 2rem;
`;

const Plusbutton = styled.button`
  //나만의 데스크탑 아이템 추가 버튼
  margin: 0.5vw;
  border: none;
  background-color: #3d3d3d;
  padding: 0%;
  border-radius: 2.5vw;
  cursor: pointer;
  border-radius: 1rem;
  drop-shadow: 0 0 0.5rem #000000;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.5s;
  }
`;

const PlusImage = styled.img`
  // 아이템 추가 이미지
  width: full;
  pointer-events: none;
`;

const Flexdiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Flexdiv2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
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

function Mypage() {
  const navigate = useNavigate();

  const { name, nickname, email, setNickname } = userStore();
  const [newNickname, setNewNickname] = useState('');
  const [posts, setPosts] = useState([]);
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // 닉네임 수정 모달 핸들러
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const putUserInfoModalOpen = () => {
    setIsUserInfoModalOpen(true);
  };
  const putUserInfoModalClose = () => {
    setIsUserInfoModalOpen(false);
  };

  useEffect(() => {
    if (name) {
      const fetchFavorite = async () => {
        try {
          const response = await getFavorite();
          await setPosts(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchFavorite();
    }
  }, []);

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
      </Link>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container>
        <TitleContainer>
          <TitleText>회원 정보</TitleText>
        </TitleContainer>
        <ProfileContainer>
          <InfoContainer>
            <img
              src={profile}
              alt="프로필 사진"
              style={{
                width: '20%',
                pointerEvents: 'none',
                marginRight: '2rem',
              }}
            />
            <Flexdiv2>
              <Name>{nickname ? nickname : '비회원'}</Name>
              <Email>{email ? email : null}</Email>
            </Flexdiv2>
          </InfoContainer>
          <ButtonContainer>
            <Button
              variant="contained"
              size="large"
              style={{
                background: 'rgba(52, 154, 248, 1)',
                margin: '0.5vw',
                fontSize: '1vw',
                width: '6vw',
                height: '2.5vw',
                whiteSpace: 'nowrap',
              }}
              onClick={putUserInfoModalOpen}
            >
              이름 변경
            </Button>
            <Modal
              open={isUserInfoModalOpen}
              onClose={putUserInfoModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: '#262626',
                  border: 'none',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  label="변경할 이름을 입력하세요"
                  variant="outlined"
                  inputMode="email"
                  margin="dense"
                  InputProps={{ style: { color: 'white' } }}
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={async () => {
                    const response = await putUserInfo(name, newNickname);
                    setNickname(response.data.nickname);
                    putUserInfoModalClose();
                  }}
                >
                  수정
                </Button>
              </Box>
            </Modal>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              style={{
                background: 'rgba(52, 154, 248, 1)',
                margin: '0.5vw',
                fontSize: '1vw',
                width: '6vw',
                height: '2.5vw',
                whiteSpace: 'nowrap',
              }}
            >
              사진 변경
            </Button>
            <Link to="/login">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{
                  background: 'rgba(52, 154, 248, 1)',
                  margin: '0.5vw',
                  fontSize: '1vw',
                  width: '6vw',
                  height: '2.5vw',
                  whiteSpace: 'nowrap',
                }}
                onClick={() => sessionStorage.removeItem('token')}
              >
                {name ? '로그아웃' : '로그인'}
              </Button>
            </Link>
            <Button
              variant="contained"
              color="error"
              size="large"
              style={{
                margin: '0.5vw',
                fontSize: '1vw',
                width: '6vw',
                height: '2.5vw',
                whiteSpace: 'nowrap',
              }}
              onClick={() => {
                deleteUser();
                sessionStorage.removeItem('token');
                navigate('/login');
              }}
            >
              회원탈퇴
            </Button>
          </ButtonContainer>
        </ProfileContainer>

        <TitleContainer>
          <TitleText>최근 좋아요 누른 게시물</TitleText>
          <Link to="/mypage/favoriteboard">
            <Button style={{ fontSize: '1vw' }}>전체보기</Button>
          </Link>
        </TitleContainer>
        <SetupContainer>
          {posts.length > 0 ? (
            renderPosts()
          ) : (
            <p
              style={{
                width: '100%',
                textAlign: 'center',
                color: 'white',
                fontSize: '1.5rem',
              }}
            >
              좋아요한 게시물이 없습니다
            </p>
          )}
        </SetupContainer>
        <TitleContainer>
          <TitleText>나만의 데스크탑</TitleText>
          <Dropdown />
        </TitleContainer>
        <div
          style={{
            backgroundColor: '#414141',
            borderRadius: '1vw',
            display: 'flex',
            boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.5)',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <div>
            <div style={{ marginRight: '1vw' }}>
              <Flexdiv>
                <Plusbutton onClick={openModal}>
                  <PlusImage src={plusbox} />
                </Plusbutton>
                <Plusbutton onClick={openModal}>
                  <PlusImage src={plusbox} />
                </Plusbutton>
                <Plusbutton onClick={openModal}>
                  <PlusImage src={plusbox} />
                </Plusbutton>
              </Flexdiv>
              <Flexdiv>
                <Plusbutton onClick={openModal}>
                  <PlusImage src={plusbox} />
                </Plusbutton>
                <Plusbutton onClick={openModal}>
                  <PlusImage src={plusbox} />
                </Plusbutton>
                <Plusbutton onClick={openModal}>
                  <PlusImage src={plusbox} />
                </Plusbutton>
              </Flexdiv>

              <Flexdiv>
                <Plusbutton onClick={openModal}>
                  <PlusImage src={plusbox} />
                </Plusbutton>
                <Plusbutton onClick={openModal}>
                  <PlusImage src={plusbox} />
                </Plusbutton>
                <Plusbutton onClick={openModal}>
                  <PlusImage src={plusbox} />
                </Plusbutton>

                <CustomModal isOpen={IsModalOpen} onClose={closeModal} />
              </Flexdiv>
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Mypage;
