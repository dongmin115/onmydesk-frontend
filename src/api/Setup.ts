import axios from 'axios';

export const getSetups = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/setups`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
      params: {
        page: 1,
        limit: 5,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const postSetup = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/setups`,
      {
        setupName: 'setup name',
        products: [],
      },
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

export const deleteSetups = async (setupId: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_KEY}/setups/${setupId}`,
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

export const getSetupDetail = async (setupId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_KEY}/setups/${setupId}`,
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

export const deleteSetupGoods = async (
  setupId: number,
  setupProductId: number
) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_KEY}/setups/${setupId}/${setupProductId}`,
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
