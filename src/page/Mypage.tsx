import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from '../components/Modal.tsx';
import Header from '../components/Header.tsx';
import Dropdown from '../components/Dropdown.tsx';

import profile from '../assets/image/mypage/profile-image.svg';
import bar from '../assets/image/mypage/bar.svg';
import textbox from '../assets/image/mypage/text.svg';
import plusbox from '../assets/image/mypage/plusbox.svg';
import sumbox from '../assets/image/mypage/sum.svg';
import changeprofile from '../assets/image/mypage/changeprofile.svg';
import setting from '../assets/image/mypage/settings.svg';

// 스타일드 컴포넌트 생성
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const Name = styled.span`
  margin-left: 10px; // 이름과 프로필 사진 사이의 간격 조정
  font-size: 2vw; // 임시 이름의 글꼴 크기
`;

const ProfileButton = styled.button`
  //프로필 변경 버튼
  background: rgba(52, 154, 248, 1);
  font-family: 'Courier New', Courier, monospace;
  border-radius: 1vw;
  width: 10vw;
  height: 2.5vw;
  margin: 1vw;
  margin-left: 10vw;
  font-size: 1.2vw;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center; //중심축
  align-items: center; //교차축

  &:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
  }
`;

const Setupbutton = styled.button`
  //좋아요 게시물 버튼
  margin: 1vw;
  border: none;
  background-color: transparent;
  padding: 0%;
  border-radius: 0.8vw;
  cursor: pointer;

  box-shadow: 0 0 0 0 transparent;

  &:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
  }
`;

const PostImage = styled.img`
  //좋아요 게시물 이미지
  width: 20vw;
  pointer-events: none;
`;

const Plusbutton = styled.button`
  //나만의 데스크탑 아이템 추가 버튼
  margin: 1vw;
  border: none;
  background-color: transparent;
  padding: 0%;
  border-radius: 2.5vw;
  cursor: pointer;

  box-shadow: 0 0 0 0 transparent;

  &:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
  }
`;

const PlusImage = styled.img`
  // 아이템 추가 이미지
  width: 10vw;
  pointer-events: none;
`;

function Mypage() {
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Bar = styled.img`
    width: 70vw;
    pointer-events: none;
  `;

  const Flexdiv = styled.div`
    display: flex;
  `;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Header />

      <div className="profile">
        <ProfileContainer>
          <img
            src={profile}
            alt="프로필 사진"
            style={{ width: '10vw', pointerEvents: 'none' }}
          />
          <Name>한승철</Name>
          <div>
            <div>
              <ProfileButton>
                <img
                  src={setting}
                  style={{ width: '2vw', pointerEvents: 'none' }}
                />{' '}
                이름 변경
              </ProfileButton>
            </div>
            <div>
              <ProfileButton>
                <img
                  src={setting}
                  style={{ width: '2vw', pointerEvents: 'none' }}
                />{' '}
                사진 변경
              </ProfileButton>
            </div>
          </div>
        </ProfileContainer>
      </div>

      <div className="bar">
        <Bar src={bar} />
      </div>

      <div style={{ margin: '1vw' }}>
        <div style={{ fontSize: '2vw', color: 'white' }}>
          최근 좋아요 누른 게시물
        </div>
        <Setupbutton>
          <PostImage src={textbox} />
        </Setupbutton>
        <Setupbutton>
          <PostImage src={textbox} />
        </Setupbutton>
        <Setupbutton>
          <PostImage src={textbox} />
        </Setupbutton>
      </div>

      <div className="bar">
        <Bar src={bar} />
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <div
            style={{
              fontSize: '2vw',
              margin: '1vw',
              color: 'white',
              marginRight: '16vw',
              display: 'flex',
            }}
          >
            나만의 데스크탑 만들기
            <Dropdown />
          </div>

          <Flexdiv>
            <Plusbutton onClick={openModal}>
              <PlusImage src={plusbox} />
            </Plusbutton>
            <Plusbutton>
              <PlusImage src={plusbox} />
            </Plusbutton>
            <Plusbutton>
              <PlusImage src={plusbox} />
            </Plusbutton>
          </Flexdiv>
          <Flexdiv>
            <Plusbutton>
              <PlusImage src={plusbox} />
            </Plusbutton>
            <Plusbutton>
              <PlusImage src={plusbox} />
            </Plusbutton>
            <Plusbutton>
              <PlusImage src={plusbox} />
            </Plusbutton>
          </Flexdiv>
          <Flexdiv>
            <Plusbutton>
              <PlusImage src={plusbox} />
            </Plusbutton>
            <Plusbutton>
              <PlusImage src={plusbox} />
            </Plusbutton>
            <Plusbutton>
              <PlusImage src={plusbox} />
            </Plusbutton>

            <Modal isOpen={IsModalOpen} onClose={closeModal} />
          </Flexdiv>
        </div>
        <div>
          <img
            src={sumbox}
            style={{ width: '23vw', marginRight: '1vw', pointerEvents: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Mypage;
