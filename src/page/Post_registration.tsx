import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

import test from '../assets/image/mypage/sum.svg';
import logo from '../assets/logo.svg';
import thumbnail from '../assets/image/Post_registration/thumbnail.svg';
import extraimage from '../assets/image/Post_registration/extraimage.svg';
import mouse from '../assets/image/Post_registration/mouse.svg';

const Centerdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ForText = styled.div`
  //상단 텍스트
  color: white;
  font-size: 2vw;
  margin-left: 15vw;
`;

const Title_field = styled.input`
  //제목 작성 필드
  background-color: #3c3c3c;
  color: white;
  border: none;
  border: 1px solid #424242;
  margin: 1vw;
  width: 68vw;
  height: 2vw;
  font-size: 1.5vw;
  padding: 0.5vw;
  outline: none;

  ::placeholder {
    color: #aaaaaa;
  }

  &:focus {
    border-color: #349af8;
  }
`;

const Main_text_field = styled.textarea`
  //본문 작성 필드
  background-color: #3c3c3c;
  color: white;
  border: 1px solid #424242;
  border-radius: 20px;
  margin: 1vw;
  width: 68vw;
  height: 30vw;
  font-size: 1.2vw;
  padding: 0.5vw;
  outline: none;
  resize: none;

  ::placeholder {
    color: #aaaaaa;
  }

  &:focus {
    border-color: #349af8;
  }
`;

const Thumbnailbutton = styled.button`
  //사진 추가 버튼
  margin: 1vw;
  border: none;
  background-color: transparent;
  padding: 0%;
  border-radius: 2.5vw;

  box-shadow: 0 0 0 0 transparent;

  &:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
  }
`;

const Thumbnail_image = styled.img`
  //썸네일 이미지
  border-radius: 2.5vw;
  width: 33vw;
  pointer-events: none;
`;

const Extra_image = styled.img`
  //추가 이미지
  border-radius: 2.5vw;
  width: 15vw;
  pointer-events: none;
`;

function Post_reg() {
  return (
    <div>
      <Centerdiv>
        <img src={logo} style={{ width: '30vw' }} />
      </Centerdiv>

      <ForText>셋업 등록하기</ForText>

      <Centerdiv style={{ marginTop: '1vw' }}>
        <Title_field type="text" placeholder="게시글의 제목을 입력하세요." />
        <div style={{ display: 'flex' }}>
          <div>
            <Thumbnailbutton>
              <Thumbnail_image src={thumbnail} />
            </Thumbnailbutton>
          </div>
          <div>
            <div style={{ display: 'flex' }}>
              <Thumbnailbutton>
                <Extra_image src={extraimage} />
              </Thumbnailbutton>
              <Thumbnailbutton>
                <Extra_image src={extraimage} />
              </Thumbnailbutton>
            </div>
            <div style={{ display: 'flex' }}>
              <Thumbnailbutton>
                <Extra_image src={extraimage} />
              </Thumbnailbutton>
              <Thumbnailbutton>
                <Extra_image src={extraimage} />
              </Thumbnailbutton>
            </div>
          </div>
        </div>
      </Centerdiv>

      <ForText style={{ marginTop: '4vw' }}>글 작성하기</ForText>

      <Centerdiv>
        <Main_text_field
          type="text"
          placeholder="셋업을 소개하는 글을 작성해보세요."
        />
      </Centerdiv>

      <ForText style={{ marginTop: '2vw' }}>상품 등록</ForText>

      <Centerdiv>
        <div
          style={{
            backgroundColor: '#3c3c3c',
            height: '5vw',
            width: '68vw',
            marginBottom: '3vw',
            marginTop: '1vw',
          }}
        >
          <img src={mouse} />
          상품명 가격
        </div>
      </Centerdiv>
    </div>
  );
}

export default Post_reg;
