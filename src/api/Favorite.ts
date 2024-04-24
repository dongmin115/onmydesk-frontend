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
