import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductModal from '../components/ProductModal';
import Navbar from '../components/Navbar';
import mouse from '../assets/image/Post_registration/mouse.svg';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { TextField, Box } from '@mui/material';

const Centerdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputTextField = styled(TextField)({
  '& label': {
    // placeholder text color
    color: 'grey',
    fontSize: '1.4vw',
  },
});

const Item_box = styled.div`
  //상품 등록 박스
  background-color: #3c3c3c;
  height: 6vw;
  width: 68vw;
  margin-bottom: 1vw;

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

function Post_fix() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const [IsModalopen, setIsModalopen] = useState(false); //상품 창 모달
  const [ArrProduct, setArrProduct] = useState<Product[]>([]);

  interface Product {
    productName: string;
    img: string;
    productCode: string;
    lprice: number;
    brand: string;
    maker: string;
    category1: string;
    category2: string;
    category3?: string;
    category4?: string;
    pages: { price: number; link: string; storeName: string }[];
  }

  const handleProductSelect = (product) => {
    setArrProduct([...ArrProduct, product]);
    setIsModalopen(false); // 모달 닫기
  };

  const handleProductDelete = (indexToRemove) => {
    const updatedProducts = ArrProduct.filter(
      (_, index) => index !== indexToRemove
    );
    setArrProduct(updatedProducts);

    console.log(ArrProduct);
  };

  const Modalopen = () => {
    setIsModalopen(true);
  };

  const Modalclose = () => {
    setIsModalopen(false);
  };

  const handleQuillChange = (content, delta, source, editor) => {
    setContent(content);
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'],
    ],
  };

  const formats = [
    'font',
    'size',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  const titlehandle = (event) => {
    setTitle(event.target.value);
  };

  const Handlefix = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/posts/${id}`,
        {
          title: `${title}`,
          content: `${content}`,
          products: ArrProduct,
        },

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);
      console.log(ArrProduct);

      alert('게시글이 수정되었습니다.');
      window.history.back();
    } catch (error) {
      console.log('에러');
      alert('게시글 수정 권한이 없습니다.');
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
        }}
      >
        <div>
          <Centerdiv style={{ marginTop: '2vw' }}>
            <div
              style={{
                background: '#3c3c3c',
                borderRadius: '10px',
              }}
            >
              <InputTextField
                sx={{
                  input: {
                    color: 'white',
                    fontSize: '1.3vw',
                    marginTop: '0.5vw',
                  },
                }}
                size="small"
                id="filled-basic"
                label="Title"
                variant="filled"
                style={{
                  width: '68vw',
                }}
                value={title}
                onChange={titlehandle}
              />
            </div>
          </Centerdiv>
          <Box
            sx={{
              '  .ql-editor': {
                margin: '2px',
                backgroundColor: '#3c3c3c',
                fontSize: '20px',
                color: 'white',
              },
              ' .ql-toolbar': {
                backgroundColor: '#aeaaaa',
                border: 'none',
              },
              ' .ql-container': {
                borderColor: `#aeaaaa`,
              },
            }}
          >
            <ReactQuill
              style={{ height: `600px`, marginTop: '1vw', marginBottom: '1vw' }}
              theme="snow"
              modules={modules}
              formats={formats}
              onChange={handleQuillChange}
            />
          </Box>

          <div style={{ display: 'flex' }}>
            <Item_button
              style={{
                color: '#349af8',
                marginTop: '3vw',
              }}
              onClick={Modalopen}
            >
              게시글 상품 추가
            </Item_button>
          </div>

          <Centerdiv>
            {ArrProduct.map((product, index) => (
              <Item_box>
                <img
                  src={product.img}
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
                  <Item_text>상품명</Item_text>:
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.productName,
                    }}
                  />
                </div>

                <div
                  style={{
                    color: 'white',
                    width: '20vw',
                    fontSize: '1.5vw',
                    marginLeft: '6vw',
                  }}
                >
                  <Item_text>가격</Item_text>: {product.lprice} KRW
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
                    onClick={() => handleProductDelete(index)}
                  >
                    삭제
                  </Item_button>
                </div>
              </Item_box>
            ))}

            <Finbuttonbox>
              <Finbutton
                style={{ marginRight: '1vw', backgroundColor: '#0085FF' }}
                onClick={Handlefix}
              >
                수정하기
              </Finbutton>
            </Finbuttonbox>
            <ProductModal
              isOpen={IsModalopen}
              onClose={Modalclose}
              onSelect={handleProductSelect}
            />
          </Centerdiv>
        </div>
      </div>
    </>
  );
}

export default Post_fix;
