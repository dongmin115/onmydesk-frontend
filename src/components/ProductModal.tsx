import { Key } from '@mui/icons-material';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// 모달 스타일드 컴포넌트 생성
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #a9a9a977;
  padding: 20px;
  border-radius: 10px;
  width: 60vw;
  height: 40vw;
  overflow: auto;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const SearchInput = styled.input`
  height: 1vw;
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px; /* 오른쪽 둥근 모서리만 적용 */
  font-size: 16px;
`;

const SearchButton = styled.button`
  height: 2.2vw;
  border: 1px solid #ccc;
  border-radius: 0 5px 5px 0; /* 오른쪽 둥근 모서리만 적용 */
  background-color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`;

const Item_box = styled.button`
  //상품 등록 박스
  background-color: #3c3c3c;
  height: 8vw;
  width: 100%;
  margin-top: 1vw;
  border-radius: 1vw;
  transition: 0.3s;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`;

const Item_text = styled.b`
  color: #419df3;
  font-size: 1.2vw;
`;

const Item_button = styled.button`
  //상품 등록 추가,삭제 버튼
  background-color: transparent;
  border: none;
  font-size: 1.2vw;
  cursor: pointer;
`;

// 모달 컴포넌트 정의
function ProductModal({ isOpen, onClose }) {
  const [Keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    setKeyword(event.target.value);
  };

  const test = () => {
    console.log('검색어:', Keyword);
  };

  const searchProduct = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/products/search',
        {
          params: {
            query: Keyword,
            display: 10,
          },
        }
      );
      console.log(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  if (isOpen) {
    console.log();
    return (
      <ModalWrapper>
        <ModalContent>
          <ModalCloseButton onClick={onClose}>닫기</ModalCloseButton>
          <div>
            <SearchInput
              type="text"
              placeholder="제품을 검색해보세요"
              onChange={handleSearch}
            />
            <SearchButton onClick={searchProduct}>검색확인</SearchButton>
          </div>

          <div>
            {searchResults.map((product) => (
              <Item_box>
                <img
                  src={product.img}
                  style={{
                    width: '8vw',
                    borderRadius: '1vw 0 0 1vw',
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
                  <Item_text>상품명</Item_text>
                  <div
                    dangerouslySetInnerHTML={{ __html: product.productName }}
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
                  <Item_text>가격</Item_text> {product.lprice} KRW
                </div>
                <div
                  style={{
                    color: 'white',
                    fontSize: '2vw',
                    marginLeft: 'auto',
                    marginRight: '1vw',
                  }}
                ></div>
              </Item_box>
            ))}
          </div>
        </ModalContent>
      </ModalWrapper>
    );
  }
}

export default ProductModal;
