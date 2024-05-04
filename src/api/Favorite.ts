import axios from 'axios';

export const getFavorite = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/user/posts/hearts',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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
      `http://localhost:8080/api/posts/hearts/${postId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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
      `http://localhost:8080/api/posts/hearts/${postId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
