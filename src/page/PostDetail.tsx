import styled from 'styled-components';
import Navbar from '../components/Navbar';
import SetupImage from '../assets/SetupImage.png';
import Mouse from '../assets/Mouse.png';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';

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
  font-size: 2.5rem;
`;

const DeskInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6.8vh;
  margin-left: 23vw;
  margin-right: 22vw;
  color: #ffffff;
  font-family: 'Kiwi Maru';
`;

const DeskInfo = styled.div`
  flex-grow: 1;
  font-size: 1.3rem;
`;

const EditDeleteContainer = styled.div`
  display: flex;
  gap: 1.2vw;
  color: #349af8;
`;

const DateInfo = styled.div`
  padding-left: 2%;
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
  font-size: 1.3rem;
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
  transition: 0.5s ease;
  box-shadow: 0px 0px 10px 0px #000000;

  &:hover {
    transform: scale(1.1);
  }
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

const CommentButtonContainer = styled.div`
  position: absolute;
  bottom: 5%;
  left: 79%;
  display: flex;
  align-items: center;
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
  bottom: 23%;
  left: 2.8%;
`;

const CommentEditContainer = styled.div`
  position: absolute;
  bottom: 3%;
  left: 82%;
  display: flex;
  align-items: center;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextArea = styled.textarea`
  flex: 1;
  height: 50%;
  padding: 1rem;
  border: 1px solid #575757;
  border-radius: 0.5rem;
  background-color: #2c2c2c;
  color: white;
  align-items: flex-start;
  font-size: 1.1rem;
  resize: none;

  &::placeholder {
    color: #a9a9a9;
  }

  &:focus {
    outline: none;
    border-color: #808080;
  }
`;

const PostDetail = () => {
  return (
    <>
      <Navbar />
      <SetupTitleContainer>
        <SetupTitle>Setup Title</SetupTitle>
      </SetupTitleContainer>
      <DeskInfoContainer>
        <AccountCircleIcon sx={{ fontSize: 50, mb: 2, mr: 2 }} />
        <DeskInfo>Sumin Lee's desk</DeskInfo>
        <EditDeleteContainer>
          <Button href="#text-buttons">수정</Button>
          <Button href="#text-buttons">삭제</Button>
        </EditDeleteContainer>
        <DateInfo>2024.03.15</DateInfo>
      </DeskInfoContainer>
      <Image src={SetupImage} />
      <RightBox>
        <Circle>
          <Button
            variant="contained"
            sx={{
              borderRadius: '50%',
              minWidth: '50px',
              height: '50px',
              bgcolor: 'grey.800',
              color: 'red',
              '&:hover': {
                bgcolor: 'grey.700',
              },
            }}
          >
            <FavoriteBorderIcon />
          </Button>
        </Circle>
        <Circle>
          <Button
            variant="contained"
            sx={{
              borderRadius: '50%',
              minWidth: '50px',
              height: '50px',
              bgcolor: 'grey.800',
              color: 'white',
              '&:hover': {
                bgcolor: 'grey.700',
              },
            }}
          >
            <BookmarkIcon />
          </Button>
        </Circle>
        <Circle>
          <Button
            variant="contained"
            sx={{
              borderRadius: '50%',
              minWidth: '50px',
              height: '50px',
              bgcolor: 'grey.800',
              color: 'white',
              '&:hover': {
                bgcolor: 'grey.700',
              },
            }}
          >
            <ShareIcon />
          </Button>
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
        <TextArea placeholder="댓글을 입력하세요" />

        <CommentButtonContainer>
          <Button
            variant="contained"
            color="success"
            sx={{
              borderRadius: '9px',
              width: '7vw',
              height: '3.5vh',
              ml: 8,
            }}
          >
            댓글 작성
          </Button>
        </CommentButtonContainer>
      </CommentContainer>

      <CommentContainer>
        <AccountCircleIcon sx={{ color: 'white', fontSize: 90, mt: 5 }} />
        <UserName>임동민</UserName>
        <CommentBox1>
          <CommentBox2>
            <Reply>좋습니다~!!!!</Reply>
          </CommentBox2>
        </CommentBox1>
        <CommentEditContainer>
          <Button href="#text-buttons">수정</Button>
          <Button href="#text-buttons">삭제</Button>
        </CommentEditContainer>
      </CommentContainer>
    </>
  );
};

export default PostDetail;
