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
import { useState, useEffect, useCallback } from 'react';

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
  padding-top: 1vw;
  padding-bottom: 2vw;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  margin-left: 23%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* 스크롤바 트랙 배경 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모양 */
    transition: background-color 0.3s ease; /* 애니메이션 효과 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* 마우스 호버 시 색상 변경 */
  }
`;

const SetupObject = styled.div`
  width: 31%; /* SetupObject의 고정된 너비 */
  min-width: 31%; /* 최소 너비 지정 (선택 사항) */
  margin-right: 20px; /* 각 SetupObject 사이의 간격 설정 (선택 사항) */
  border-radius: 1rem;
  background-color: #2f2d2d;
  transition: 0.5s ease;
  box-shadow: 0px 0px 10px 0px #000000;
  overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */

  &:hover {
    transform: scale(1.05);
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
const ObjectName = styled.div`
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
`;

const CommentButtonContainer = styled.div`
  position: absolute;
  bottom: 5%;
  left: 79%;
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  position: absolute;
  color: #ffffff;
  font-family: 'Abhaya Libre ExtraBold';
  font-size: 1rem;
  bottom: -8%;
  left: 4.3%;
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
type Comment = {
  id: number;
  commentId: number;
  content: string;
  nickname: string;
};

const PostDetail = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [productPost, setProductPost] = useState([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/posts/${id}`
        );
        setPosts(response.data.data.post);
        setProductPost(response.data.data.products);

        const commentsResponse = await axios.get(
          `http://localhost:8080/api/posts/${id}/comments`
        );
        setComments(commentsResponse.data.data);
        console.log('목록 불러오기 성공:', response.data.data);
      } catch (error) {
        console.log('목록 불러오기 실패:', error);
      }
    }

    fetchPosts();
  }, [id]);

  const PostDel = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/posts/${id}`,

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return alert('댓글을 입력해주세요.');

    try {
      const response = await axios.post(
        `http://localhost:8080/api/posts/${id}/comments`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      setComment(''); // 댓글 입력창 초기화
      setComments((comments) => [...comments, response.data.data]);

      alert('댓글이 작성되었습니다.');
      window.location.reload();
    } catch (error) {
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const updateComment = async (commentId, updatedContent) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/posts/${id}/comments/${commentId}`,
        { content: updatedContent },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      console.log('Response:', response.data);
      setComments((currentComments) =>
        currentComments.map((comment) =>
          comment.commentId === commentId
            ? { ...comment, content: updatedContent }
            : comment
        )
      );
      alert('댓글이 수정되었습니다.');
      window.location.reload();
    } catch (error) {
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/posts/${id}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      setComments((currentComments) =>
        currentComments.filter((comment) => comment.commentId !== commentId)
      );
      alert('댓글이 삭제되었습니다.');
    } catch (error) {
      alert('댓글 삭제에 실패했습니다.');
    }
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
        {productPost.map((post, index) => (
          <SetupObject>
            <ObjectImage src={post.img} />
            <ObjectNameContainer>
              <ObjectName
                dangerouslySetInnerHTML={{ __html: post.productName }}
              ></ObjectName>
            </ObjectNameContainer>
            <ObjectCostContainer>
              <ObjectCost>{post.lprice} KRW</ObjectCost>
            </ObjectCostContainer>
          </SetupObject>
        ))}
      </SetupObjectContainer>

      <Line></Line>
      <TotalContainer>
        <Total>{posts.totalPrice} KRW</Total>
      </TotalContainer>
      <CommentContainer>
        <TextArea
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <CommentButtonContainer>
          <Button
            onClick={handleCommentSubmit}
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

      {comments.map((comment, index) => (
        <CommentContainer key={index} style={{ position: 'relative' }}>
          <AccountCircleIcon sx={{ color: 'white', fontSize: 90, mt: 5 }} />
          <UserName>{comment.nickname || '익명'}</UserName>
          <CommentBox1
            style={{
              padding: '10px',
              border: '1px solid #555',
              borderRadius: '4px',
              background: '#444',
              marginBottom: '10px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {editingCommentId === comment.commentId ? (
              <TextArea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                style={{
                  flexGrow: 1,
                  marginRight: '8px',
                  marginBottom: '10px',
                }}
              />
            ) : (
              <div style={{ minHeight: '40px', color: 'white' }}>
                {comment.content}
              </div>
            )}
            <div style={{ alignSelf: 'flex-end', display: 'flex' }}>
              {editingCommentId === comment.commentId ? (
                <>
                  <Button
                    onClick={() =>
                      updateComment(comment.commentId, editingContent)
                    }
                    sx={{ margin: '10px 10px 10px 0' }}
                  >
                    확인
                  </Button>
                  <Button onClick={() => setEditingCommentId(null)}>
                    취소
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{ marginRight: 1 }}
                    onClick={() => {
                      setEditingCommentId(comment.commentId);
                      setEditingContent(comment.content);
                    }}
                  >
                    수정
                  </Button>
                  <Button onClick={() => deleteComment(comment.commentId)}>
                    삭제
                  </Button>
                </>
              )}
            </div>
          </CommentBox1>
        </CommentContainer>
      ))}
    </>
  );
};

export default PostDetail;
