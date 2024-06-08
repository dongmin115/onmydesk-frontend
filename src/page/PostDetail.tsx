import axios from 'axios';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const SetupTitleContainer = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: flex-end;
`;
const SetupTitle = styled.span`
  margin-left: 20%;
  color: #ffffff;
  width: 100%;
  height: 4vh;
  font-family: 'Kiwi Maru';
  font-size: 2.5rem;
`;

const DeskInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6.8vh;
  margin-left: 20vw;
  margin-right: 22vw;
  margin-bottom: 1vw;
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
  font-size: 1vw;
`;

const UrlImage = styled.img`
  height: 70vh;
  border-radius: 1rem;
`;

const TextContainer = styled.div`
  color: #ffffff;
  width: 55vw;
  margin-left: 23%;
  padding: 1rem;
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
  width: 54vw;
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
  width: 30%; /* SetupObject의 고정된 너비 */
  min-width: 30%; /* 최소 너비 지정 (선택 사항) */
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

const PrevArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  font-size: 3rem;
  color: white;

  &:hover {
    color: #349af8; /* 호버 시 색상 변경 */
    font-size: 3.5rem; /* 호버 시 크기 변경 */
    transition: 0.2s;
  }
`;

const NextArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  font-size: 3rem;
  color: white;

  &:hover {
    color: #349af8; /* 호버 시 색상 변경 */
    font-size: 3.5rem; /* 호버 시 크기 변경 */
    transition: 0.2s;
  }
`;

const StyledCarousel = styled(Carousel)`
  .carousel .slide {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: 0;
    transition:
      opacity 1s ease-in-out,
      transform 1s ease-in-out;
  }

  .carousel .slide.selected {
    opacity: 1;
  }
`;

const ImageGallery = ({ imageUrls }) => {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    return <></>;
  }

  const handlePrevClick = (onClickHandler) => {
    onClickHandler();
  };

  const handleNextClick = (onClickHandler) => {
    onClickHandler();
  };

  return (
    <StyledCarousel
      showArrows={true} // 화살표를 숨김
      showStatus={false}
      centerSlidePercentage={45}
      renderArrowPrev={(onClickHandler, hasPrev) =>
        hasPrev && (
          <PrevArrow onClick={() => handlePrevClick(onClickHandler)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </PrevArrow>
        )
      }
      renderArrowNext={(onClickHandler, hasNext) =>
        hasNext && (
          <NextArrow onClick={() => handleNextClick(onClickHandler)}>
            <FontAwesomeIcon icon={faArrowRight} />
          </NextArrow>
        )
      }
    >
      {imageUrls.map((imageUrl, index) => (
        <div key={index} style={{ width: '100%' }}>
          <UrlImage key={index} src={imageUrl} alt={`Image ${index}`} />
        </div>
      ))}
    </StyledCarousel>
  );
};

const PostDetail = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState({ title: '', imageUrls: [] });
  const [productPost, setProductPost] = useState([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/posts/${id}`
        );
        setPosts(response.data.data.post);
        setProductPost(response.data.data.products);

        const commentsResponse = await axios.get(
          `${import.meta.env.VITE_API_KEY}/posts/${id}/comments`
        );
        setComments(commentsResponse.data.data);
      } catch (error) {
        console.log('목록 불러오기 실패:', error);
      }
    }

    fetchPosts();
  }, [id]);

  const urllist = posts.imageUrls.map((value) => value.url);
  //객체의 값 뽑아서 새로운 이미지 배열 만들기~

  const PostDel = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_KEY}/posts/${id}`,

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
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
        <Button
          sx={{
            background: '#565e66', // 기본 백그라운드 색상
            color: 'white',
            fontSize: '0.8vw',
            '&:hover': {
              background: '#0077cc', // 호버 시 백그라운드 색상 변경
            },
          }}
        >
          수정
        </Button>
      </Link>
    );
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return alert('댓글을 입력해주세요.');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/posts/${id}/comments`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
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
        `${import.meta.env.VITE_API_KEY}/posts/${id}/comments/${commentId}`,
        { content: updatedContent },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        }
      );
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
        `${import.meta.env.VITE_API_KEY}/posts/${id}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
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

  const formatPrice = (price?: string) => {
    if (price == null) {
      console.error('Price is undefined or null');
      return '';
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <>
      <Navbar />
      <SetupTitleContainer>
        <SetupTitle>{posts.title}</SetupTitle>
      </SetupTitleContainer>
      <DeskInfoContainer>
        <AccountCircleIcon sx={{ fontSize: '3vw', mr: 2 }} />
        <DeskInfo>{posts.nickname}</DeskInfo>
        <EditDeleteContainer>
          {Fixbutton()}
          <Button
            sx={{
              background: '#565e66', // 기본 백그라운드 색상
              color: 'white',
              fontSize: '0.8vw',
              '&:hover': {
                background: '#0077cc', // 호버 시 백그라운드 색상 변경
              },
            }}
            onClick={postDelCallback}
          >
            삭제
          </Button>
        </EditDeleteContainer>
        <DateInfo>{posts.updatedAt}</DateInfo>
      </DeskInfoContainer>
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '60%' }}>
          <ImageGallery imageUrls={urllist} />
        </div>
      </div>
      <TextContainer style={{ display: 'flex', justifyContent: 'center' }}>
        <div dangerouslySetInnerHTML={{ __html: posts.content }} />
      </TextContainer>
      <SetupItemContainer>
        <SetupItem>Setup Item</SetupItem>
      </SetupItemContainer>

      <SetupObjectContainer>
        {productPost.map((product, index) => (
          <SetupObject key={product.id}>
            <Link to={`/productdetail/${product.id}`}>
              <ObjectImage src={product.img} />
              <ObjectNameContainer>
                <ObjectName
                  dangerouslySetInnerHTML={{ __html: product.productName }}
                ></ObjectName>
              </ObjectNameContainer>
              <ObjectCostContainer>
                <ObjectCost>{formatPrice(product.lprice)} KRW</ObjectCost>
              </ObjectCostContainer>
            </Link>
          </SetupObject>
        ))}
      </SetupObjectContainer>

      <Line></Line>
      <TotalContainer>
        <Total>{formatPrice(posts.totalPrice)} KRW</Total>
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
