import React , {useState} from "react";
import styled from "styled-components";

import Modal from "../../components/Modal.tsx"
import Header from "../../components/Header.tsx"

import './Mypage.css'

import profile from "../../assets/profile-image.svg";
import bar from "../../assets/bar.svg";
import textbox from "../../assets/text.svg";
import plusbox from "../../assets/plusbox.svg";
import sumbox from "../../assets/sum.svg";

import changeprofile from "../../assets/changeprofile.svg";

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
  width: 10vw;
  height: 2vw;
  margin: 1vw;
  margin-left:10vw;
  font-size: 1.2vw;
  border: none;
  cursor: pointer;
  position: relative;
`;

const Setupbutton = styled.button`
  margin: 1vw;
  border: none;
  background-color: transparent;
  padding: 0%;
  border-radius: 1vw;
`;

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
              <ProfileButton>이름 변경</ProfileButton>
            </div>
            <div>
              <ProfileButton>사진 변경</ProfileButton>
            </div>
          </div>
        </ProfileContainer>
      </div>

      <div className="bar">
        <img src={bar} alt="바" style={{width:"70vw"}} />
      </div>
      

      <div style={{ margin: "1vw" }}>
        <div style={{ fontSize: "2vw", margin: "1vw"  , color:"white" , marginLeft:"3vw" }}>
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
          <div style={{ fontSize: "2vw" , margin: "1vw" , color:"white" , marginRight:"20vw"}}>
            나만의 데스크탑 만들기
          </div>
          <div style={{ display: "flex" }}>
            <Setupbutton onClick={openModal}>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Setupbutton>
            <Setupbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Setupbutton>
            <Setupbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Setupbutton>
    
          </div>
          <div style={{ display: "flex" }}>
            <Setupbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Setupbutton>
            <Setupbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Setupbutton>
            <Setupbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Setupbutton>
        
          </div>
          <div style={{ display: "flex" }}>
            <Setupbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Setupbutton>
            <Setupbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Setupbutton>
            <Setupbutton>
              <img src={plusbox} alt="플러스 박스" style={{width:"10vw"}}/>
            </Setupbutton>

            
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