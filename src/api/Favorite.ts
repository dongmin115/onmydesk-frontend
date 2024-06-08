import axios from 'axios';

export const getFavorite = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_KEY}/user/posts/hearts`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const favorite = async (postId: number) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/posts/hearts/${postId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const disFavorite = async (postId: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_KEY}/posts/hearts/${postId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
