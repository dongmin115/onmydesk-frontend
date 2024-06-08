import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Postlist() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/posts?page=1&limit=9&criteria=1`
        );
        setPosts(response.data.data);
      } catch (error) {
        console.log('목록 불러오기 실패:', error);
      }
    }

    fetchPosts();
  }, []);

  // 반환할 JSX가 없는 경우, posts 상태를 반환하도록 변경
  return posts;
}
