import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.svg';
import thumbnail from '../assets/image/Post_registration/thumbnail.svg';
import extraimage from '../assets/image/Post_registration/extraimage.svg';
import mouse from '../assets/image/Post_registration/mouse.svg';
import { Editor, EditorState, RichUtils } from 'draft-js';

import { TextField } from '@mui/material';

const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqaWh5ZUBuYXZlci5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzEzMjg5NTgyfQ.RHsbFOr9rsSCdRnrTZOwDX_BRXa7Cu_nsblSOxWTSxmJRbM5WCVZYSsvaxATlBxOlwT-pc4GvFWRAwCLDZaKHg`;

const Centerdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ForText = styled.div`
  //상단 텍스트
  color: white;
  font-size: 1.7vw;
  margin-left: 1vw;
`;

const InputTextField = styled(TextField)({
  '& label': {
    // placeholder text color
    color: 'grey',
    fontSize: '1.4vw',
  },
});

const Main_text_field = styled.textarea`
  //본문 작성 필드
  background-color: #3c3c3c;
  color: white;
  border: 2px solid #424242;
  margin: 1vw;
  width: 68vw;
  height: 30vw;
  font-size: 1.2vw;
  padding: 0.5vw;
  outline: none;
  resize: none;
  transition: 0.3s;

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
  width: 30vw;
  pointer-events: none;
`;

const Extra_image = styled.img`
  //추가 이미지
  border-radius: 2.5vw;
  width: 13.5vw;
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const titlehandle = (event) => {
    setTitle(event.target.value);
  };

  const toggleInlineStyle = (style) => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const contenthandle = (event) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    console.log(`제목변경:${title}`);
  }, [title]);

  useEffect(() => {
    console.log(`내용 변경:${content}`), [content];
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/posts`,
        {
          title: `${title}`,
          content: `${content}`,
          products: [
            {
              productName:
                'Apple <b>아이패드</b> 에어 5세대 M1 WIFI 64G 스페이스 그레이 (MM9C3KH/A)',
              img: 'https://shopping-phinf.pstatic.net/main_3153084/31530843620.20220705164247.jpg',
              productCode: '31530843620',
              lprice: 828490,
              brand: 'Apple',
              maker: 'Apple',
              category1: '디지털/가전',
              category2: '태블릿PC',
              category3: 'string',
              category4: 'string',
              pages: [
                {
                  price: 829690,
                  link: 'https://search.shopping.naver.com/gate.nhn?id=31530843620',
                  storeName: '네이버',
                },
              ],
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      alert('게시글이 등록되었습니다.');
      window.history.back();
    } catch (error) {
      console.log('에러');
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '3vw',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(to left, #515151, #808080be)',
            padding: '1vw',
            height: '87vw',
            borderRadius: '1vw',
          }}
        >
          <ForText>셋업 등록하기</ForText>

          <Centerdiv style={{ marginTop: '1vw' }}>
            <InputTextField
              sx={{
                input: {
                  color: 'white',
                  fontSize: '1.3vw',
                  marginTop: '0.5vw',
                },
              }}
              id="filled-basic"
              label="Title"
              variant="filled"
              style={{
                width: '68vw',
                backgroundColor: '#3c3c3c',
                color: 'white',
              }}
              value={title}
              onChange={titlehandle}
            />
          </Centerdiv>

          <ForText style={{ marginTop: '4vw' }}>글 작성하기</ForText>

          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            placeholder="내용을 입력하세요..."
          />

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
                style={{
                  width: '4.5vw',
                  marginLeft: '2vw',
                  pointerEvents: 'none',
                }}
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

              <Finbutton
                style={{ marginRight: '1vw', backgroundColor: '#0085FF' }}
                onClick={handleSubmit}
              >
                등록하기
              </Finbutton>
            </Finbuttonbox>
          </Centerdiv>
        </div>
      </div>
    </>
  );
}

export default Post_reg;
