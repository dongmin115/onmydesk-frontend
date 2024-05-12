import { useEffect, useState } from 'react';
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
  background-color: rgba(87, 87, 87, 0.9);
  padding: 20px;
  border-radius: 10px;
  width: 60vw;
  height: 40vw;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* 스크롤바 트랙 배경 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모양 */
    transition: background-color 0.3s ease; /* 애니메이션 효과 */
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
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

// 모달 컴포넌트 정의
function GoodsModal({ isOpen, onClose, onSelect }) {
  const [searchGoods, setSearchGoods] = useState([]);

  const ClickProduct = (product) => {
    onSelect(product);
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchFavoriteGoods();
    }
  };

  const fetchFavoriteGoods = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/user/products/wishes',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data.data);
      setSearchGoods(response.data.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchFavoriteGoods();
    }
  }, [isOpen]); // isOpen이 변경될 때마다 useEffect를 실행합니다.

  if (isOpen) {
    console.log();
    return (
      <ModalWrapper>
        <ModalContent>
          <ModalCloseButton onClick={onClose}>닫기</ModalCloseButton>

          <div>
            {searchGoods.map((product) => (
              <Item_box
                key={product.productCode}
                onClick={() => ClickProduct(product)}
              >
                <img
                  src={product.img}
                  style={{
                    width: '7.5vw',
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

export default GoodsModal;
