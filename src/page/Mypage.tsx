import { useEffect, useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import profile from '../assets/image/mypage/profile-image.svg';
import Navbar from '../components/Navbar.tsx';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Tab,
  TextField,
  ThemeProvider,
} from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from '../store.ts';
import { deleteUser, getUserInfo, putUserInfo } from '../api/User.ts';
import { Favorite, FavoriteBorder, RemoveRedEye } from '@mui/icons-material';
import { disFavorite, favorite, getFavorite } from '../api/Favorite.ts';
import { LikeCountsMap, LikesMap, Post, Setup } from '../types/type.ts';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  deleteSetupGoods,
  deleteSetups,
  getSetupDetail,
  getSetups,
  postSetup,
} from '../api/Setup.ts';
import GoodsModal from '../components/GoodsModal.tsx';
import axios from 'axios';
import { Product } from '../types/Product.ts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0085FF',
    },
    secondary: {
      main: '#4F4F4F',
    },
    success: {
      main: '#E24E4E',
    },
  },
});

// 스타일드 컴포넌트 생성
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 2%;
  padding-bottom: 2%;
  max-width: 1440px;
  margin: 0 auto; /* 화면 가운데 정렬 */
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
`;

const TitleText = styled.p`
  font-size: 1.5rem;
  color: #d3d3d3;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  width: 100%;
  height: 13vh;
  background: #3d3d3d;
  border-radius: 1vw;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding-left: 5%;
  width: 30%;
`;

const Name = styled.span`
  font-size: 1.5rem; // 임시 이름의 글꼴 크기
  text-align: center;
`;

const Email = styled.span`
  font-size: 1rem;
  text-align: center;
  color: #7b7878;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1vw;
  padding-right: 5%;
`;

const SetupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3rem;
  gap: 2rem;
`;

const Flexdiv2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const ImageContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const SetupBoardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  drop-shadow: 0 0 0.5rem #000000;
  transition: transform 0.5s;

  /* 이미지 위에 마우스를 올렸을 때 약간 확대합니다 */
  ${ImageContainer}:hover & {
    transform: scale(1.05);
    filter: brightness(0.3);
  }
`;

const Caption = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.3s;

  /* 호버 시 투명도 변경 */
  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

function CustomTabLabel({
  name,
  onDelete,
}: {
  name: string;
  onDelete: () => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {name}
      <Button
        onClick={onDelete}
        style={{ minWidth: '30px', padding: '0 5px', marginLeft: '10px' }}
      >
        삭제
      </Button>
    </div>
  );
}

function Mypage() {
  const navigate = useNavigate();

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { name, nickname, email, setName, setNickname, setEmail } = userStore();
  const [newNickname, setNewNickname] = useState('');
  const [posts, setPosts] = useState([]);
  const [setups, setSetups] = useState<Setup[]>([]);

  const [IsModalopen, setIsModalopen] = useState(false); //상품 창 모달
  const [productsBySetup, setProductsBySetup] = useState<
    Record<number, Product[]>
  >({});

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const refreshSetups = async () => {
    const setups = await getSetups();
    setSetups([...setups.data]); // 새 배열 생성으로 상태 갱신 강제
  };
  const handlePost = async () => {
    await postSetup();
    refreshSetups();
  };

  const handleDelete = async (setupId: number) => {
    await deleteSetups(setupId);
    refreshSetups();
  };

  const handleProductSelect = async (product: Product, setupId: number) => {
    // 새로운 상품 목록을 준비
    const updatedProducts = [...productsBySetup[setupId], product];
    console.log('Updated products:', updatedProducts);

    try {
      // 서버에 업데이트 요청
      const response = await axios.put(
        `http://localhost:8080/api/setups/${setupId}`,
        {
          setupName: 'Setup Name', // 셋업 이름 업데이트 필요 시 수정
          products: updatedProducts,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        }
      );
      if (response.status === 200) {
        // 상태 업데이트
        setProductsBySetup((prev) => ({
          ...prev,
          [setupId]: updatedProducts,
        }));
      }
    } catch (error) {
      console.error('Failed to update products:', error);
    }

    setIsModalopen(false); // 모달 닫기
  };

  const Modalopen = () => {
    setIsModalopen(true);
  };

  const Modalclose = () => {
    setIsModalopen(false);
  };

  const [likes, setLikes] = useState<LikesMap>({}); // 포스트의 좋아요 상태를 저장하는 객체
  const [likeCounts, setLikeCounts] = useState<LikeCountsMap>({}); // 포스트의 좋아요 수를 저장하는 객체

  // 닉네임 수정 모달 핸들러
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const putUserInfoModalOpen = () => {
    setIsUserInfoModalOpen(true);
  };
  const putUserInfoModalClose = () => {
    setIsUserInfoModalOpen(false);
  };

  const toggleLike = async (postId: number) => {
    const currentLiked = likes[postId];
    try {
      if (currentLiked) {
        disFavorite(postId);
      } else {
        favorite(postId);
      }
      // 상태 업데이트
      setLikes((prev) => ({
        ...prev,
        [postId]: !currentLiked,
      }));
      // 좋아요 수 업데이트
      setLikeCounts((prev) => ({
        ...prev,
        [postId]: currentLiked ? prev[postId] - 1 : prev[postId] + 1,
      }));
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const fetchSetupDetail = async (id: number) => {
    try {
      const response = await getSetupDetail(id);
      setProductsBySetup((prev) => ({
        ...prev,
        [id]: response.data.products, // 각 셋업 ID에 따라 상품 목록을 저장
      }));
    } catch (error) {
      console.error('Failed to fetch setup details:', error);
    }
  };

  const fetchGoodsDetail = async (productId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${productId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        }
      );
      return response.data.data.product;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setName(response.data.name);
        setNickname(response.data.nickname);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();

    if (name) {
      const fetchFavorite = async () => {
        try {
          const response = await getFavorite();
          setPosts(response.data);
          const initialLikes: { [key: number]: boolean } = {}; // 초기 좋아요 상태 설정
          const initialLikeCounts: { [key: number]: number } = {}; // 초기 좋아요 개수 상태 설정

          response.data.forEach((post: Post) => {
            initialLikes[post.id] = post.liked;
            initialLikeCounts[post.id] = post.heartCount;
          });
          setLikes(initialLikes);
          setLikeCounts(initialLikeCounts);
        } catch (error) {
          console.error(error);
        }
      };
      const fetchSetups = async () => {
        try {
          const setups = await getSetups();
          setSetups(setups.data);

          // 각 셋업별 상품 세부 데이터 불러오기
          const productsBySetupTemp: Record<number, Product[]> = {};
          await Promise.all(
            setups.data.map(async (setup: Setup) => {
              const response = await getSetupDetail(setup.id);
              const products = response.data.products;

              // 각 상품의 상세 정보를 불러오기
              const detailedProducts = await Promise.all(
                products.map(async (product: Product) => {
                  return await fetchGoodsDetail(product.id); // 상품의 상세 정보만 저장
                })
              );

              productsBySetupTemp[setup.id] = detailedProducts;
              setProductsBySetup(productsBySetupTemp);
            })
          );
          console.log('Updated product details:', productsBySetupTemp);
        } catch (error) {
          console.error('Error fetching setups or product details:', error);
        }
      };

      fetchFavorite();
      fetchSetups();
    }
  }, [name]);

  const renderPosts = () => {
    console.log(posts);
    return posts.map((post: Post) => (
      <Link
        key={post.id}
        to={`/PostDetail/${post.id}`}
        style={{ textDecoration: 'none' }}
      >
        <ImageContainer>
          <SetupBoardImage
            key={post.id}
            src={post.thumbnailUrl}
            alt={post.title}
          />
          <Caption>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {likes[post.id] ? (
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault(); // Link의 기본 동작을 막음
                      e.stopPropagation(); // 이벤트 전파를 막음
                      toggleLike(post.id);
                    }}
                  >
                    <Favorite color="success" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault(); // Link의 기본 동작을 막음
                      e.stopPropagation(); // 이벤트 전파를 막음
                      toggleLike(post.id);
                    }}
                  >
                    <FavoriteBorder color="success" />
                  </IconButton>
                )}
                <p>{likeCounts[post.id]}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <RemoveRedEye />
                <p>{post.viewCount}</p>
              </div>
            </div>
          </Caption>
        </ImageContainer>
      </Link>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container>
        <TitleContainer>
          <TitleText>회원 정보</TitleText>
        </TitleContainer>
        <ProfileContainer>
          <InfoContainer>
            <img
              src={profile}
              alt="프로필 사진"
              style={{
                width: '20%',
                pointerEvents: 'none',
                marginRight: '2rem',
              }}
            />
            <Flexdiv2>
              <Name>{nickname ? nickname : '비회원'}</Name>
              <Email>{email ? email : null}</Email>
            </Flexdiv2>
          </InfoContainer>
          <ButtonContainer>
            <Button
              variant="contained"
              size="large"
              style={{
                background: 'rgba(52, 154, 248, 1)',
                margin: '0.5vw',
                fontSize: '1vw',
                width: '6vw',
                height: '2.5vw',
                whiteSpace: 'nowrap',
              }}
              onClick={putUserInfoModalOpen}
            >
              이름 변경
            </Button>
            <Modal
              open={isUserInfoModalOpen}
              onClose={putUserInfoModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: '#262626',
                  border: 'none',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  label="변경할 이름을 입력하세요"
                  variant="outlined"
                  inputMode="email"
                  margin="dense"
                  InputProps={{ style: { color: 'white' } }}
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={async () => {
                    const response = await putUserInfo(name, newNickname);
                    setNickname(response.data.nickname);
                    putUserInfoModalClose();
                  }}
                >
                  수정
                </Button>
              </Box>
            </Modal>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              style={{
                background: 'rgba(52, 154, 248, 1)',
                margin: '0.5vw',
                fontSize: '1vw',
                width: '6vw',
                height: '2.5vw',
                whiteSpace: 'nowrap',
              }}
            >
              사진 변경
            </Button>
            <Link to="/login">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{
                  background: 'rgba(52, 154, 248, 1)',
                  margin: '0.5vw',
                  fontSize: '1vw',
                  width: '6vw',
                  height: '2.5vw',
                  whiteSpace: 'nowrap',
                }}
                onClick={() => sessionStorage.removeItem('accessToken')}
              >
                {name ? '로그아웃' : '로그인'}
              </Button>
            </Link>
            <Button
              variant="contained"
              color="error"
              size="large"
              style={{
                margin: '0.5vw',
                fontSize: '1vw',
                width: '6vw',
                height: '2.5vw',
                whiteSpace: 'nowrap',
              }}
              onClick={() => {
                deleteUser();
                sessionStorage.removeItem('accessToken');
                navigate('/login');
              }}
            >
              회원탈퇴
            </Button>
          </ButtonContainer>
        </ProfileContainer>

        <TitleContainer>
          <TitleText>최근 좋아요 누른 게시물</TitleText>
          <Link to="/mypage/favoriteboard">
            <Button style={{ fontSize: '1vw' }}>전체보기</Button>
          </Link>
        </TitleContainer>
        <SetupContainer>
          {posts.length > 0 ? (
            renderPosts()
          ) : (
            <p
              style={{
                width: '100%',
                textAlign: 'center',
                color: 'white',
                fontSize: '1.5rem',
              }}
            >
              좋아요한 게시물이 없습니다
            </p>
          )}
        </SetupContainer>
        <TitleContainer>
          <TitleText>나만의 데스크탑</TitleText>
        </TitleContainer>
        <div
          style={{
            backgroundColor: '#3d3d3d',
            width: '100%',
            borderRadius: '1vw',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {setups &&
                  setups.map((setup: Setup, i: number) => (
                    <Tab
                      label={
                        <CustomTabLabel
                          name={setup.setupName}
                          onDelete={() => handleDelete(setup.id)}
                        />
                      }
                      value={(i + 1).toString()}
                      onClick={async () => await fetchSetupDetail(setup.id)}
                    />
                  ))}
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handlePost}
                  style={{ fontSize: '1vw' }}
                >
                  셋업 만들기
                </Button>
              </TabList>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  height: 'fit-content',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                }}
              >
                <p
                  style={{
                    color: '#7b7878',
                    width: '60%',
                    textAlign: 'center',
                  }}
                >
                  제품
                </p>
                <p
                  style={{
                    color: '#7b7878',
                    width: '10vw',
                    textAlign: 'center',
                  }}
                >
                  최저가
                </p>
                <div style={{ width: '10vw' }}></div>
              </div>
              <Divider style={{ marginLeft: '2rem', marginRight: '2rem' }} />
              {setups &&
                setups.map((setup: Setup, i: number) => (
                  <TabPanel value={(i + 1).toString()} key={setup.id}>
                    {productsBySetup[setup.id] &&
                      productsBySetup[setup.id].map((product) => (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}
                        >
                          <img
                            src={product.img}
                            alt={product.productName}
                            style={{
                              width: 'fit-content',
                              height: '5vw',
                              borderRadius: '1rem',
                              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
                            }}
                          />
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'start',
                              justifyContent: 'center',
                              marginLeft: '1rem',
                            }}
                          >
                            <p
                              style={{
                                fontSize: '1.25rem',
                                color: 'white',
                                fontWeight: 'bold',
                                width: '100%',
                              }}
                            >
                              {product.productName}
                            </p>
                          </div>
                          <p
                            style={{
                              fontSize: '1.25rem',
                              color: 'white',
                              width: '10vw',
                              textAlign: 'center',
                            }}
                          >
                            {product.lprice}원
                          </p>
                          <Button
                            variant="contained"
                            color="error"
                            style={{ fontSize: '1rem' }}
                            onClick={() =>
                              deleteSetupGoods(setup.id, product.id)
                            }
                          >
                            삭제
                          </Button>
                        </div>
                      ))}
                    <Divider style={{ margin: '1rem' }} />
                    <GoodsModal
                      isOpen={IsModalopen}
                      onClose={Modalclose}
                      onSelect={(product: Product) =>
                        handleProductSelect(product, setup.id)
                      }
                      setupId={setup.id}
                    />
                    <Button onClick={Modalopen}>추가하기</Button>
                  </TabPanel>
                ))}
            </Box>
          </TabContext>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Mypage;
