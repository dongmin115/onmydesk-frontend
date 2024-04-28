// store.js

import { create } from 'zustand'; // create로 zustand를 불러옵니다.

interface user {
  nickname: string;
  setNickname: (nickname: string) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
}
export const userStore = create<user>((set) => ({
  nickname: '', // 초기값을 설정합니다.
  setNickname: (nickname: string) => set({ nickname }), // nickname을 설정하는 함수를 만듭니다.
  name: '',
  setName: (name: string) => set({ name }),
  email: '',
  setEmail: (email: string) => set({ email }),
}));
