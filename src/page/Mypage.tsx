import { useState } from 'react';
import styled from 'styled-components';

import Modal from '../components/Modal.tsx';
import Dropdown from '../components/Dropdown.tsx';

import profile from '../assets/image/mypage/profile-image.svg';
import bar from '../assets/image/mypage/bar.svg';
import textbox from '../assets/image/mypage/text.svg';
import plusbox from '../assets/image/mypage/plusbox.svg';
import sumbox from '../assets/image/mypage/sum.svg';
import chat from '../assets/image/mypage/chat.svg';
import Navbar from '../components/Navbar.tsx';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { userStore } from '../store.ts';

// 스타일드 컴포넌트 생성
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const Name = styled.span`
  margin-right: 3vw; // 이름과 프로필 사진 사이의 간격 조정
  margin-left: 0.5vw;
  font-size: 1.5vw; // 임시 이름의 글꼴 크기
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
  background-color: transparent;
  padding: 0%;
  border-radius: 2.5vw;
  transition: all 0.5s;
  cursor: pointer;

  box-shadow: 0 0 0 0 transparent;

  &:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
  }
`;

const PlusImage = styled.img`
  // 아이템 추가 이미지
  width: 8vw;
  pointer-events: none;
`;

function Mypage() {
  const { name, nickname } = userStore();

  const [IsModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Flexdiv = styled.div`
    display: flex;
    flex-direction: row;
  `;

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2vw',
        }}
      >
        <div className="profile">
          <ProfileContainer>
            <img src={bar} style={{ marginRight: '1vw' }} />
            <img
              src={profile}
              alt="프로필 사진"
              style={{ width: '3.5vw', pointerEvents: 'none' }}
            />
            <Name>{name}</Name>
            <Name>{nickname}</Name>

            <div>
              <div>
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
                >
                  이름 변경
                </Button>

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
                    로그아웃
                  </Button>
                </Link>
              </div>
            </div>
            <img src={bar} style={{ marginLeft: '1vw' }} />
          </ProfileContainer>
        </div>

        <div style={{ display: 'flex' }}>
          <div
            style={{
              backgroundColor: ' #414141',
              borderRadius: '1vw',
              margin: '1vw',
              marginRight: '1vw',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.5)',
              padding: '1vw',
              height: '31vw',
            }}
          >
            <div style={{ fontSize: '1.4vw', color: 'white' }}>
              최근 좋아요 누른 게시물
              <Link to="/mypage/favoriteboard">
                <Button style={{ fontSize: '1vw' }}>전체보기</Button>
              </Link>
            </div>
            <div>
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
            <div>
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
          </div>

          <div
            style={{
              backgroundColor: '#414141',
              borderRadius: '1vw',
              display: 'flex',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.5)',
              padding: '1vw',
              marginTop: '1vw',
              height: '31vw',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '1.4vw',
                  color: 'white',
                  display: 'flex',
                }}
              >
                나만의 데스크탑 만들기
                <Dropdown />
              </div>
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

                  <Modal isOpen={IsModalOpen} onClose={closeModal} />
                </Flexdiv>
              </div>
            </div>
            <div>
              <img
                src={sumbox}
                style={{
                  width: '16vw',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mypage;
