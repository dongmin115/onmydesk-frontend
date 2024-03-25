import React from "react";
import styled from "styled-components";

import "./Mypage.css";
import Header from "../../component/Header.tsx";
import profile from "../../assets/profile-image.svg";
import bar from "../../assets/bar.svg";
import textbox from "../../assets/text.svg";
import plusbox from "../../assets/plusbox.svg";
import changeprofile from "../../assets/changeprofile.svg";

// 스타일드 컴포넌트 생성
const ProfileContainer = styled.div`
  display:flex;
  align-items: center;
`;


const Name = styled.span`
  margin-left: 10px; // 이름과 프로필 사진 사이의 간격 조정
  font-size: 25px; // 임시 이름의 글꼴 크기
`;

const Button = styled.button` // 버튼들 간의 간격 조정
  background: rgba(52, 154, 248, 1);
  border: none;
  cursor: pointer;
  position:relative;
`;

const Setupbutton = styled.button`
  margin: 1vw;
  border: none;
  background-color: transparent;
  padding: 0%;
  border-radius: 1vw;
  
`;

function Mypage() {
  return (
    <div >
      <Header />
      <div className="profile">
        <ProfileContainer>
          <img src={profile} alt="프로필 사진" />
          <Name>한승철</Name>    
        <div>
            <div>    
                <Button>이름 변경</Button>
            </div>
            <div>
                <Button>사진 변경</Button>
            </div>
        </div> 
        </ProfileContainer> 
          
      </div>

      <div className="bar">
        <img src={bar} alt="바" />
      </div>
      <div style={{fontSize:"2vw" , margin:"1vw"}}>
        최근 좋아요 누른 게시물
      </div>

      <div style={{margin:"1vw"}}>
        <Setupbutton ><img src={textbox} alt="텍스트 상자" /></Setupbutton>
        <Setupbutton ><img src={textbox} alt="텍스트 상자" /></Setupbutton>
        <Setupbutton ><img src={textbox} alt="텍스트 상자" /></Setupbutton>
     
        
      </div>

      <div className="bar">
        <img src={bar} alt="바" />
      </div>

      <div>
        <div>
          <Setupbutton>
            <img src={plusbox} alt="플러스 박스" />
          </Setupbutton>
          <Setupbutton>
            <img src={plusbox} alt="플러스 박스" />
          </Setupbutton>
          <Setupbutton>
            <img src={plusbox} alt="플러스 박스" />
          </Setupbutton>
          <Setupbutton>
            <img src={plusbox} alt="플러스 박스" />
          </Setupbutton>
        </div>
        <div>
        <Setupbutton>
            <img src={plusbox} alt="플러스 박스" />
          </Setupbutton>
          <Setupbutton>
            <img src={plusbox} alt="플러스 박스" />
          </Setupbutton>
          <Setupbutton>
            <img src={plusbox} alt="플러스 박스" />
          </Setupbutton>
          <Setupbutton>
            <img src={plusbox} alt="플러스 박스" />
          </Setupbutton>
        </div>
      </div>
    </div>
  );
}

export default Mypage;