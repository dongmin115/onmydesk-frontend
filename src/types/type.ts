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
