import { useState } from 'react';
import styled from 'styled-components';

import CustomModal from '../components/Modal.tsx';
import Dropdown from '../components/Dropdown.tsx';

import profile from '../assets/image/mypage/profile-image.svg';
import textbox from '../assets/image/mypage/text.svg';
import plusbox from '../assets/image/mypage/plusbox.svg';
import chat from '../assets/image/mypage/chat.svg';
import Navbar from '../components/Navbar.tsx';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button, Modal, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from '../store.ts';
import { deleteUser, putUserInfo } from '../api/User.ts';

// 스타일드 컴포넌트 생성
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10%;
  padding-right: 10%;
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
  margin-bottom: 1rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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

const Setupbutton = styled.button`
  margin: 1vw;
  border: none;
  background-color: transparent;
  padding: 0%;
  border-radius: 1vw;
  cursor: pointer;
  transition: 0.5s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);

  &:hover {
    transform: scale(1.1);
  }
`;

const PostImage = styled.img`
  //좋아요 게시물 이미지
  width: 15vw;
  pointer-events: none;
  border-radius: 1vw 1vw 0 0;
`;

const Postinfo = styled.div`
  background: #3d3d3d;
  width: 15vw;
  height: 5vw;
  border-radius: 0 0 1vw 1vw;
`;

const PostTitle = styled.div`
  display: flex;
  font-size: 1.2vw;
  font-family: -moz-initial;
  color: white;
  padding: 0.5vw;
  margin-left: 0.5vw;
`;

const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Postdetail = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const Text = styled.div`
  white-space: nowrap;
  font-size: 0.9vw;
  margin-left: 0.3vw;
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

function Mypage() {
  const navigate = useNavigate();

  const { name, nickname, email, setNickname } = userStore();
  const [newNickname, setNewNickname] = useState('');

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

  return (
    <>
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
        <div
          style={{
            backgroundColor: ' #414141',
            borderRadius: '1vw',
            boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.5)',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Setupbutton>
            <PostImage src={textbox} />
            <Postinfo>
              <PostTitle>Setup Title</PostTitle>
              <PostItem>
                <Postdetail style={{ marginLeft: '0.5vw' }}>
                  <img src={profile} style={{ width: '1.3vw' }} />
                  <Text>작성자</Text>
                </Postdetail>
                <Postdetail style={{ marginRight: '0.5vw' }}>
                  <FavoriteBorderIcon
                    style={{ width: '1.3vw', color: 'red' }}
                  />
                  <Text>24</Text>
                  <img
                    src={chat}
                    style={{ width: '1.3vw', marginLeft: '0.5vw' }}
                  />{' '}
                  <Text>5</Text>
                </Postdetail>
              </PostItem>
            </Postinfo>
          </Setupbutton>
          <Setupbutton>
            <PostImage src={textbox} />
            <Postinfo>
              <PostTitle>Setup Title</PostTitle>
              <PostItem>
                <Postdetail style={{ marginLeft: '0.5vw' }}>
                  <img src={profile} style={{ width: '1.3vw' }} />
                  <Text>작성자</Text>
                </Postdetail>
                <Postdetail style={{ marginRight: '0.5vw' }}>
                  <FavoriteBorderIcon
                    style={{ width: '1.3vw', color: 'red' }}
                  />
                  <Text>24</Text>
                  <img
                    src={chat}
                    style={{ width: '1.3vw', marginLeft: '0.5vw' }}
                  />{' '}
                  <Text>5</Text>
                </Postdetail>
              </PostItem>
            </Postinfo>
          </Setupbutton>
          <Setupbutton>
            <PostImage src={textbox} />

            <Postinfo>
              <PostTitle>Setup Title</PostTitle>
              <PostItem>
                <Postdetail style={{ marginLeft: '0.5vw' }}>
                  <img src={profile} style={{ width: '1.3vw' }} />
                  <Text>작성자</Text>
                </Postdetail>
                <Postdetail style={{ marginRight: '0.5vw' }}>
                  <FavoriteBorderIcon
                    style={{ width: '1.3vw', color: 'red' }}
                  />
                  <Text>24</Text>
                  <img
                    src={chat}
                    style={{ width: '1.3vw', marginLeft: '0.5vw' }}
                  />{' '}
                  <Text>5</Text>
                </Postdetail>
              </PostItem>
            </Postinfo>
          </Setupbutton>
          <Setupbutton>
            <PostImage src={textbox} />

            <Postinfo>
              <PostTitle>Setup Title</PostTitle>
              <PostItem>
                <Postdetail style={{ marginLeft: '0.5vw' }}>
                  <img src={profile} style={{ width: '1.3vw' }} />
                  <Text>작성자</Text>
                </Postdetail>
                <Postdetail style={{ marginRight: '0.5vw' }}>
                  <FavoriteBorderIcon
                    style={{ width: '1.3vw', color: 'red' }}
                  />
                  <Text>24</Text>
                  <img
                    src={chat}
                    style={{ width: '1.3vw', marginLeft: '0.5vw' }}
                  />{' '}
                  <Text>5</Text>
                </Postdetail>
              </PostItem>
            </Postinfo>
          </Setupbutton>
        </div>
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
    </>
  );
}

export default Mypage;
