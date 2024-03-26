import styled from "styled-components";

// 모달 스타일드 컴포넌트 생성
const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const ModalContent = styled.div`
    background-color: #A9A9A9;
    padding: 20px;
    border-radius: 10px;
    width: 60vw;
    height: 45vw;
`;

const ModalCloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
`;

// 모달 컴포넌트 정의
function Modal({ isOpen, onClose }) {
    
 if(isOpen) {
    console.log(isOpen)    //isOpen true 될때만 모달 열기
    return (
        <ModalWrapper>
            <ModalContent>
            <h2>모달 내용</h2>
            <p>모달 내용을 여기에 추가하세요.</p>
            <ModalCloseButton onClick={onClose}>닫기</ModalCloseButton>
          </ModalContent>
        </ModalWrapper>
    );
 }
}

export default Modal