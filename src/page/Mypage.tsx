import React , {useState} from "react";
import styled from "styled-components";

import Modal from "../components/Modal.tsx"
import Header from "../components/Header.tsx"
import Dropdown from "../components/Dropdown.tsx"

import profile from "../assets/image/mypage/profile-image.svg";
import bar from "../assets/image/mypage/bar.svg";
import textbox from "../assets/image/mypage/text.svg";
import plusbox from "../assets/image/mypage/plusbox.svg";
import sumbox from "../assets/image/mypage/sum.svg";
import changeprofile from "../assets/image/mypage/changeprofile.svg";
import setting from "../assets/image/mypage/settings.svg"



// 스타일드 컴포넌트 생성
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  color:white;
`;

const Name = styled.span`
  margin-left: 10px; // 이름과 프로필 사진 사이의 간격 조정
  font-size: 2vw; // 임시 이름의 글꼴 크기
`;

const ProfileButton = styled.button`
  background: rgba(52, 154, 248, 1);
  font-family: 'Courier New', Courier, monospace;
  border-radius: 1vw;
  width: 10vw;
  height: 2.5vw;
  margin: 1vw;
  margin-left:10vw;
  font-size: 1.2vw;
  border: none;
  cursor: pointer;
  position: relative;
  display:flex;
  justify-content: center; //중심축
  align-items: center; //교차축


  &:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5); /* 원하는 색상 및 효과에 맞게 조절 가능 */
  }
`;

const Setupbutton = styled.button`
  margin: 1vw;
  border: none;
  background-color: transparent;
  padding: 0%;
  border-radius: 0.8vw;


  /* 기본적으로는 테두리가 투명하게 설정 */
  box-shadow: 0 0 0 0 transparent;

  /* 호버 시 테두리가 빛나도록 설정 */
  &:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5); /* 원하는 색상 및 효과에 맞게 조절 가능 */
    transform: scale(1.05)
  }
`;

const Plusbutton = styled.button`
  margin: 1vw;
  border: none;
  background-color: transparent;
  padding: 0%;
  border-radius: 2.5vw;

    /* 기본적으로는 테두리가 투명하게 설정 */
    box-shadow: 0 0 0 0 transparent;

/* 호버 시 테두리가 빛나도록 설정 */
  &:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5); /* 원하는 색상 및 효과에 맞게 조절 가능 */
  }
`

function Mypage() {
  const [IsModalOpen , setIsModalOpen] = useState(false);

  const openModal =()=> {
    setIsModalOpen(true);
  };
  const closeModal =()=> {
    setIsModalOpen(false);
  }

  return (

    
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>  
    
      <Header />
      
      <div className="profile">
        <ProfileContainer>
          <img src={profile} alt="프로필 사진" style={{width:"10vw"}}/>
          <Name>한승철</Name>
          <div>
            <div>
              <ProfileButton><img src={setting} style={{width:"2vw"}}/> 이름 변경</ProfileButton>
            </div>
            <div>
              <ProfileButton><img src={setting} style={{width:"2vw"}}/> 사진 변경</ProfileButton>
            </div>
          </div>
        </ProfileContainer>
      </div>

      <div className="bar">
        <img src={bar} alt="바" style={{width:"70vw"}} />
      </div>
      

      <div style={{ margin: "1vw" }}>
        <div style={{ fontSize: "2vw"  , color:"white" }}>
        최근 좋아요 누른 게시물
        </div>
        <Setupbutton><img src={textbox} alt="텍스트 상자" style={{width:"20vw"}}/></Setupbutton>
        <Setupbutton><img src={textbox} alt="텍스트 상자" style={{width:"20vw"}}/></Setupbutton>
        <Setupbutton><img src={textbox} alt="텍스트 상자" style={{width:"20vw"}}/></Setupbutton>
      </div>

      <div className="bar">
        <img src={bar} alt="바" style={{width:"70vw"}}/>
      </div>
      <div style={{display:"flex"}}>
        <div>
          <div style={{ fontSize: "2vw" , margin: "1vw" , color:"white" , marginRight:"16vw" , display:"flex"}}>
            나만의 데스크탑 만들기 
            <Dropdown/>
          </div>

          <div style={{ display: "flex" }}>
            <Plusbutton onClick={openModal}>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Plusbutton>
            <Plusbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Plusbutton>
            <Plusbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Plusbutton>
    
          </div>
          <div style={{ display: "flex" }}>
            <Plusbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Plusbutton>
            <Plusbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Plusbutton>
            <Plusbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Plusbutton>
        
          </div>
          <div style={{ display: "flex" }}>
            <Plusbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Plusbutton>
            <Plusbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Plusbutton>
            <Plusbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Plusbutton>

            
            <Modal isOpen={IsModalOpen} onClose={closeModal} />
          </div>
        </div>
          <div>
            <img src = {sumbox} style={{width:"23vw" , marginRight:"1vw"}}/>
          </div>
      </div>
    </div>
  );
}

export default Mypage;