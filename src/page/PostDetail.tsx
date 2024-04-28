import axios from 'axios';

import styled from 'styled-components';
import Navbar from '../components/Navbar';
import SetupImage from '../assets/SetupImage.png';
import Mouse from '../assets/Mouse.png';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';

import { Link, useParams } from 'react-router-dom';

import SetupBoard from './SetupBoard';
import { useState, useEffect, useCallback } from 'react';

const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqaWh5ZUBuYXZlci5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzEzMjg5NTgyfQ.RHsbFOr9rsSCdRnrTZOwDX_BRXa7Cu_nsblSOxWTSxmJRbM5WCVZYSsvaxATlBxOlwT-pc4GvFWRAwCLDZaKHg`;

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
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/posts/${id}`
        );
        setPosts(response.data.data.post);
        console.log('목록 불러오기 성공:', response.data.data.post);
      } catch (error) {
        console.log('목록 불러오기 실패:', error);
      }
    }

    fetchPosts();
  }, []);

  const PostDel = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/posts/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('게시글이 삭제되었습니다.');
      window.history.back();
    } catch (error) {
      console.log('에러');
      alert('권한이 없습니다.');
    }
  };

  const postDelCallback = useCallback(() => {
    const confirmed = window.confirm('게시글을 삭제하시겠습니까?');

    if (confirmed) {
      PostDel();
    }
  }, []);

  const Fixbutton = () => {
    const { id } = useParams();

    return (
      <Link to={`/Post_fix/${id}`}>
        <Button>수정</Button>
      </Link>
    );
  };

  return (
    <>
      <Navbar />
      <SetupTitleContainer>
        <SetupTitle>{posts.title}</SetupTitle>
      </SetupTitleContainer>
      <DeskInfoContainer>
        <AccountCircleIcon sx={{ fontSize: 50, mb: 2, mr: 2 }} />
        <DeskInfo>{posts.nickname}</DeskInfo>
        <EditDeleteContainer>
          {Fixbutton()}
          <Button onClick={postDelCallback}>삭제</Button>
        </EditDeleteContainer>
        <DateInfo>{posts.updatedAt}</DateInfo>
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
      <TextContainer style={{ display: 'flex', justifyContent: 'center' }}>
        <div dangerouslySetInnerHTML={{ __html: posts.content }} />
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
