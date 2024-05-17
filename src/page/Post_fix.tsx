import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductModal from '../components/ProductModal';
import Navbar from '../components/Navbar';
import ReactQuill from 'react-quill';
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

const UploadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1vw;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  background-color: #565e66;
  width: 49%;
  color: white;
  font-size: 1.2vw;
  padding: 0.5vw 0.5vw;
  cursor: pointer;
  border-radius: 0.5vw;
  border: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0077cc;
  }
`;

const Thumbnail_img = styled.button`
  background: transparent;
  max-width: 68vw;
  cursor: pointer;
  padding: 0;
  width: 9.2vw; /* Set the width of the button */
  height: 8.3vw; /* Set the height of the button */
  margin: 0.2vw;
  border: none;
  overflow: hidden;

  &:hover {
    border: 2px solid #fc6d6d; /* Add a border on hover */
  }

  &:active {
    opacity: 0.5; /* Reduce opacity when clicked */
    border: 2px solid #fc6d6d;
  }
`;

function Post_fix() {
  const { id } = useParams();
  const [Previous_post, setPrevious_post] = useState();
  const [Previous_product, setPrevious_product] = useState([]);
  const [title, setTitle] = useState(``);
  const [content, setContent] = useState(``);
  const [IsModalopen, setIsModalopen] = useState(false); //상품 창 모달
  const [ArrProduct, setArrProduct] = useState<Product[]>([Previous_product]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imgid, setImgid] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(
    null
  );

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

  useEffect(() => {
    if (Previous_post) {
      setTitle(Previous_post.title);
      setContent(Previous_post.content);
    }
  }, [Previous_post]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/posts/${id}`
        );
        setPrevious_post(response.data.data.post);
        setPrevious_product(response.data.data.product);
        console.log('목록 불러오기 성공:', response.data.data);
      } catch (error) {
        console.log('목록 불러오기 실패:', error);
      }
    }

    fetchPosts();
  }, [id]);

  const handleThumbnailClick = (index) => {
    if (imgid.length > index) {
      setSelectedThumbnail(imgid[index]);
      console.log('썸네일 이미지 ID:', imgid[index]);
    }
  };

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
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'],
    ],
  };

  const formats = [
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
          imageIds: imgid,
          thumbnailImageId: selectedThumbnail,
        },

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
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

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file)); // 선택된 각 파일을 URL로 변환
      setPreviewImageUrls(urls); // 미리보기 이미지 URL들 설정
      console.log(urls);
      const selectedFiles = Array.from(files) as File[];
      setSelectedImages(selectedFiles);
    }
  };

  const uploadImages = async () => {
    const formData = new FormData();
    selectedImages.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post(
        'http://localhost:8080/api/images/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        }
      );

      const imageIds = response.data.data.map((image) => image.id);
      setImgid(imageIds);
      // setPreviewImageUrls([]);
      alert(
        '이미지 업로드가 완료되었습니다. 썸네일로 등록할 이미지를 클릭하세요!'
      );
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
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

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginTop: '10px',
              maxWidth: '68vw',
            }}
          >
            {previewImageUrls.map((url, index) => (
              <Thumbnail_img
                key={index}
                onClick={() => handleThumbnailClick(index)}
                // 이미지 id를 기반으로 선택된 썸네일 설정
              >
                <img
                  key={index}
                  src={url}
                  style={{
                    width: '9vw',
                    height: '8vw',
                    marginRight: '10px',
                    marginBottom: '10px',
                  }}
                  alt={`Preview ${index}`}
                />
              </Thumbnail_img>
            ))}
          </div>
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
              value={content}
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
