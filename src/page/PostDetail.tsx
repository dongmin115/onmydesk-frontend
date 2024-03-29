import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Profile from '../assets/ProfileImage.png';
import SetupImage from '../assets/SetupImage.png';
import Mouse from '../assets/Mouse.png';
import Heart from '../assets/Heart.png';
import Share from '../assets/Share.png';
import Bookmark from '../assets/Bookmark.png';
const SetupTitleContainer = styled.div`
  width: 100%;
  height: 12vh;
  display: flex;
  align-items: flex-end;
`;
const SetupTitle = styled.span`
  margin-left: 23%;
  color: #ffffff;
  width: 100%;
  height: 5vh;
  font-family: 'Kiwi Maru';
  font-size: 1.5rem;
`;

const DeskInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.8vh;
  margin-left: 23vw;
  margin-right: 22vw;
  color: #ffffff;
  font-family: 'Kiwi Maru';
`;

const DeskInfo = styled.div`
  flex-grow: 1;
  font-size: 1.8vh; // font-size는 vh 단위로 설정
`;

const EditDeleteContainer = styled.div`
  display: flex;
  gap: 1.2vw;
  color: #349af8;
`;

const EditButton = styled.span`
  cursor: pointer;
  font-size: 0.8rem;
`;

const DeleteButton = styled.span`
  cursor: pointer;
  font-size: 0.8rem;
`;

const DateInfo = styled.div`
  padding-left: 2%;
`;

const ProfileImage = styled.img`
  width: 4vw;
  height: 6vh;
  border-radius: 50%;
  margin-bottom: 2%;
`;

const Image = styled.img`
  width: 55vw;
  height: 60vh;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  margin-left: 23%;
`;

const TextContainer = styled.div`
  color: #ffffff;
  width: 55vw;
  height: 40vh;
  margin-left: 23%;
`;

const Text = styled.p`
  font-family: 'Kantumruy';
  font-size: 0.9rem;
  padding: 1%;
  text-align: center;
  line-height: 3rem;
`;
const SetupItemContainer = styled.div`
  width: 100%;
  height: 7vh;
`;

const SetupItem = styled.span`
  margin-left: 23%;
  color: #349af8;
  width: 100%;
  height: 2.4vh;
  font-family: 'Kiwi Maru';
  font-size: 1.4rem;
`;

const SetupObjectContainer = styled.div`
  width: 55vw;
  height: 42vh;
  margin-left: 23%;
  display: flex;
  justify-content: space-between;
`;

const SetupObject = styled.div`
  height: 42vh;
  width: 30%;
  border-radius: 1rem;
  background-color: #2f2d2d;
`;
const ObjectImage = styled.img`
  height: 60%;
  width: 100%;
  border-radius: 1rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;
const ObjectNameContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
`;
const ObjectName = styled.span`
  font-family: 'Kiwi Maru';
  font-size: 1rem;
  color: #ffffff;
  margin-top: 0.7rem;
`;
const ObjectCostContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
`;
const ObjectCost = styled.span`
  font-family: 'Kiwi Maru';
  font-size: 1rem;
  color: #ffffff;
`;
const Line = styled.div`
  width: 55vw;
  height: 0.1vw;
  background-color: #ffffff;
  margin-left: 23%;
  margin-top: 2%;
`;

const TotalContainer = styled.div`
  width: 100%;
  height: 7vh;
  margin-top: 1.5%;
`;
const Total = styled.span`
  color: #ffffff;
  width: 100%;
  height: 2.4vh;
  font-family: 'Kiwi Maru';
  font-size: 1.4rem;
  margin-left: 23%;
`;
const CommentContainer = styled.div`
  width: 55vw;
  height: 25vh;
  margin-left: 23%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4%;
  position: relative;
`;

const CommentProfile = styled.img`
  width: 6vw;
  height: 10vh;
  border-radius: 50%;
  margin-top: 1.5rem;
`;
const CommentBox1 = styled.div`
  width: 45vw;
  height: 25vh;
  background-color: #2f2d2d;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 29%;
    left: -30px;
    border-style: solid;
    border-width: 19px 31px 22px 0;
    border-color: transparent #2f2d2d transparent transparent;
  }
`;
const CommentBox2 = styled.div`
  width: 40vw;
  height: 16vh;
  background-color: #3c3c3c;
  margin-top: 4%;
  margin-left: 6%;
  border-radius: 1rem;
  display: flex;
`;
const Comment = styled.span`
  font-family: 'Abhaya Libre ExtraBold';
  font-size: 1rem;
  color: #8a8383;
  width: 30rem;
  height: 14vh;
  padding: 3%;
  display: flex;
`;
const CommentButtonContainer = styled.button`
  width: 7vw;
  height: 3vh;
  border-radius: 3rem;
  background-color: #52a64b;
  position: absolute;
  bottom: 6%;
  left: 79%;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
`;

const ButtonText = styled.span`
  width: 6vw;
  height: 2wh;
  color: #000000;
  font-family: 'Abhaya Libre ExtraBold';
  font-size: 0.9rem;
  margin-left: 4%;
  margin-top: 1%;
`;

const Reply = styled.span`
  font-family: 'Abhaya Libre ExtraBold';
  font-size: 1rem;
  color: #ffffff;
  width: 30rem;
  height: 14vh;
  padding: 3%;
  display: flex;
`;

const UserName = styled.span`
  position: absolute;
  color: #ffffff;
  font-family: 'Abhaya Libre ExtraBold';
  font-size: 1rem;
  bottom: 32%;
  left: 2%;
`;

const CommentEditContainer = styled.div`
  display: flex;
  gap: 1.2vw;
  color: #349af8;
  position: absolute;
  bottom: 8%;
  left: 88%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CommentEdit = styled.span`
  cursor: pointer;
  font-size: 0.8rem;
`;

const CommentDelete = styled.span`
  cursor: pointer;
  font-size: 0.8rem;
`;

const RightBox = styled.div`
  height: 27vh;
  width: 5vw;
  border-radius: 4rem;
  position: fixed;
  right: 8%;
  top: 50%;
  display: flex;
  flex-direction: column;
  gap: 19px;
`;

const Circle = styled.div`
  height: 7vh;
  width: 77%;
  border-radius: 4rem;
  background-color: #2f2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const HeartImg = styled.img`
  height: 60%;
  width: 60%;
  border-radius: 4rem;
  margin: auto;
`;
const BookmarkImg = styled.img`
  height: 50%;
  width: 40%;
  margin: auto;
`;
const ShareImg = styled.img`
  height: 60%;
  width: 40;

  margin: auto;
`;

const PostDetail = () => {
  return (
    <>
      <Navbar />
      <SetupTitleContainer>
        <SetupTitle>Setup Title</SetupTitle>
      </SetupTitleContainer>
      <DeskInfoContainer>
        <ProfileImage src={Profile} />
        <DeskInfo>Sumin Lee's desk</DeskInfo>
        <EditDeleteContainer>
          <EditButton>수정</EditButton>
          <DeleteButton>삭제</DeleteButton>
        </EditDeleteContainer>
        <DateInfo>2024.03.15</DateInfo>
      </DeskInfoContainer>
      <Image src={SetupImage} />
      <RightBox>
        <Circle>
          <HeartImg src={Heart}></HeartImg>
        </Circle>
        <Circle>
          <BookmarkImg src={Bookmark}></BookmarkImg>
        </Circle>
        <Circle>
          <ShareImg src={Share}></ShareImg>
        </Circle>
      </RightBox>
      <TextContainer>
        <Text>
          안녕하세요! 이제 막 시작한 초보 개발자입니다. 현재 프론트엔드를
          공부중이에요. 최근에 제 스타일대로 책상을 꾸며 보았어요. 저는
          개인적으로 흰색이 깔끔한거 같아서 전체적으로 화이트 톤으로 데스크
          셋업을 구성해 보았어요. 확실히 데스크 셋업을 해놓으니까 공부 할 맛이
          나는것 같아요. 자세한 구성이랑 금액은 밑에 남겨놓겠습니다!
        </Text>
      </TextContainer>
      <SetupItemContainer>
        <SetupItem>Setup Item</SetupItem>
      </SetupItemContainer>
      <SetupObjectContainer>
        <SetupObject>
          <ObjectImage src={Mouse} />
          <ObjectNameContainer>
            <ObjectName>Apple Mouse</ObjectName>
          </ObjectNameContainer>
          <ObjectCostContainer>
            <ObjectCost>89,000 KRW</ObjectCost>
          </ObjectCostContainer>
        </SetupObject>
        <SetupObject>
          <ObjectImage src={Mouse} />
          <ObjectNameContainer>
            <ObjectName>Apple Mouse</ObjectName>
          </ObjectNameContainer>
          <ObjectCostContainer>
            <ObjectCost>89,000 KRW</ObjectCost>
          </ObjectCostContainer>
        </SetupObject>
        <SetupObject>
          <ObjectImage src={Mouse} />
          <ObjectNameContainer>
            <ObjectName>Apple Mouse</ObjectName>
          </ObjectNameContainer>
          <ObjectCostContainer>
            <ObjectCost>89,000 KRW</ObjectCost>
          </ObjectCostContainer>
        </SetupObject>
      </SetupObjectContainer>
      <Line></Line>
      <TotalContainer>
        <Total>89,000 KRW</Total>
      </TotalContainer>
      <CommentContainer>
        <CommentProfile src={Profile}></CommentProfile>
        <CommentBox1>
          <CommentButtonContainer>
            <ButtonText>댓글 작성</ButtonText>
          </CommentButtonContainer>
          <CommentBox2>
            <Comment>댓글을 작성하세요</Comment>
          </CommentBox2>
        </CommentBox1>
      </CommentContainer>

      <CommentContainer>
        <CommentProfile src={Profile}></CommentProfile>
        <UserName>임동민</UserName>
        <CommentBox1>
          <CommentBox2>
            <Reply>좋습니다~!!!!</Reply>
          </CommentBox2>
        </CommentBox1>
        <CommentEditContainer>
          <CommentEdit>수정</CommentEdit>
          <CommentDelete>삭제</CommentDelete>
        </CommentEditContainer>
      </CommentContainer>
    </>
  );
};

export default PostDetail;
