import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProductModal from '../components/ProductModal';
import Navbar from '../components/Navbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextField, Box } from '@mui/material';
import { transformer } from 'zod';

const Centerdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputTextField = styled(TextField)({
  '& label': {
    // placeholder text color
    color: '#aeaaaa',
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
  width: 68vw;
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

const Thumbnail_button = styled.button<{ isSelected: boolean }>`
  background: transparent;
  max-width: 68vw;
  cursor: pointer;
  padding: 0;
  width: 9.2vw; /* Set the width of the button */
  height: 8.3vw; /* Set the height of the button */
  margin: 0.2vw;
  overflow: hidden;
  position: relative;
  border: ${({ isSelected }) => (isSelected ? '4px solid #f82020' : 'none')};
  opacity: ${({ isSelected }) => (isSelected ? '0.7' : '1')};

  &:hover {
    border: 2px solid #fc6d6d; /* Add a border on hover */
  }

  &:active {
    opacity: 0.5;
    border: 2px solid #fc6d6d;
  }
`;

function Post_reg() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [IsModalopen, setIsModalopen] = useState(false); //상품 창 모달
  const [ArrProduct, setArrProduct] = useState<Product[]>([]);
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
      [{ header: [1, 2, 3, false] }],
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

  useEffect(() => {
    console.log(imgid); // imgid 상태가 업데이트된 후 로그 출력
  }, [imgid]);

  useEffect(() => {
    console.log(previewImageUrls); // imgid 상태가 업데이트된 후 로그 출력
    uploadImages();
  }, [previewImageUrls]);

  const handleSubmit = async () => {
    if (previewImageUrls.length == 0) {
      alert('이미지를 최소 1장 업로드해주세요!');
      return;
    }
    if (previewImageUrls.length > 0 && selectedThumbnail == null) {
      alert('썸네일을 선택해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/posts`,
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

      alert('게시글이 등록되었습니다.');
      window.history.back();
    } catch (error) {
      console.log('에러');
      alert('게시글 등록에 실패했습니다.');
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files) as File[];
      const urls = selectedFiles.map((file) => URL.createObjectURL(file)); // 선택된 각 파일을 URL로 변환
      setPreviewImageUrls((prevUrls) => [...prevUrls, ...urls]); // 기존 미리보기 이미지 URL에 새 URL 추가
      setSelectedImages(selectedFiles); // 기존 이미지 배열에 새 이미지 추가
    }
  };

  const handleImageDelete = (indexToRemove) => {
    setPreviewImageUrls((prevUrls) =>
      prevUrls.filter((_, index) => index !== indexToRemove)
    );
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setImgid((prevIds) =>
      prevIds.filter((_, index) => index !== indexToRemove)
    );
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

      const newImageIds = response.data.data.map((image) => image.id);
      setImgid((prevId) => [...prevId, ...newImageIds]);
      // setPreviewImageUrls([]);
      alert('썸네일로 등록할 이미지를 선택해주세요.');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
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
          <UploadContainer>
            <UploadInput
              type="file"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            <UploadButton onClick={() => fileInputRef.current?.click()}>
              Upload image
            </UploadButton>
          </UploadContainer>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginTop: '10px',
              maxWidth: '68vw',
            }}
          >
            {previewImageUrls.map((url, index) => (
              <Thumbnail_button
                key={index}
                isSelected={selectedThumbnail === imgid[index]}
                onClick={() => handleThumbnailClick(index)}
              >
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    zIndex: '5',
                    width: '10%',
                    height: '10%',
                    position: 'absolute',
                    right: '0.5vw',
                    color: '#d43921',
                    fontSize: '1vw',
                  }}
                  onClick={() => handleImageDelete(index)}
                >
                  X
                </button>
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
              </Thumbnail_button>
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
                border: `none`,
              },
              ' .ql-container': {
                borderColor: `#aeaaaa`,
              },
            }}
          >
            <ReactQuill
              style={{
                height: `600px`,
                marginTop: '0.5vw',
                marginBottom: '0.5vw',
              }}
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

export default Post_reg;
