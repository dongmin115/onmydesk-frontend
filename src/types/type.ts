export interface User {
  email: string;
  password: string;
  nickname: string;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  nickname: string;
  heartCount: number;
  viewCount: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  liked: boolean;
}

// likes 상태에 대한 타입 정의
export type LikesMap = { [key: number]: boolean };
export type LikeCountsMap = { [key: number]: number };

export interface SetupDetail {
  id: number;
  productName: string;
  img: string;
  lprice: number;
}

export interface Setup {
  setupName: string;
  id: number;
  postTotalPrice: number;
}
