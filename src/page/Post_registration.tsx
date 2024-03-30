import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  cursor: pointer;

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

const Item_box = styled.div`
  //상품 등록 박스
  background-color: #3c3c3c;
  height: 6vw;
  width: 68vw;
  margin-bottom: 3vw;
  margin-top: 1vw;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Item_text = styled.b`
  color: #c9c9c9;
`;

const Item_button = styled.button`
  //상품 등록 추가,삭제 버튼
  background-color: transparent;
  border: none;
  font-size: 1.2vw;
  cursor: pointer;
`;

const Finbuttonbox = styled.div`
  //마지막 버튼 라인 div
  display: flex;
  flex-direction: row-reverse;
  width: 68vw;
  margin-bottom: 4vw;
`;

const Finbutton = styled.button`
  //등록하기 돌아가기 버튼
  background-color: red;
  border: none;
  border-radius: 0.5vw;
  width: 8vw;
  height: 3vw;
  font-size: 1.3vw;
  color: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
  }
`;

function Post_reg() {
  return (
    <div>
      <Centerdiv>
        <img src={logo} style={{ width: '30vw', pointerEvents: 'none' }} />
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
      <div style={{ display: 'flex' }}>
        <ForText style={{ marginTop: '2vw' }}>상품 등록</ForText>
        <Item_button
          style={{
            color: '#349af8',
            marginTop: '2.3vw',
            marginLeft: '1vw',
          }}
        >
          추가
        </Item_button>
      </div>

      <Centerdiv>
        <Item_box>
          <img
            src={mouse}
            style={{ width: '4.5vw', marginLeft: '2vw', pointerEvents: 'none' }}
          />
          <div
            style={{
              color: 'white',
              width: '20vw',
              fontSize: '1.5vw',
              marginLeft: '2vw',
            }}
          >
            <Item_text>상품명</Item_text>:Magic Mouse
          </div>
          <div
            style={{
              color: 'white',
              width: '20vw',
              fontSize: '1.5vw',
              marginLeft: '6vw',
            }}
          >
            <Item_text>가격</Item_text>: 900,0000 KRW
          </div>
          <div
            style={{
              color: 'white',
              fontSize: '2vw',
              marginLeft: 'auto',
              marginRight: '1vw',
            }}
          >
            <Item_button
              style={{
                color: 'red',
              }}
            >
              삭제
            </Item_button>
          </div>
        </Item_box>

        <Finbuttonbox>
          <Link to="/setupboard">
            <Finbutton style={{ backgroundColor: '#3C3C3C' }}>
              돌아가기
            </Finbutton>
          </Link>
          <Finbutton style={{ marginRight: '1vw', backgroundColor: '#0085FF' }}>
            등록하기
          </Finbutton>
        </Finbuttonbox>
      </Centerdiv>
    </div>
  );
}

export default Post_reg;
