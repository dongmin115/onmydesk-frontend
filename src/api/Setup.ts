import axios from 'axios';

export const getSetups = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/setups', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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
      'http://localhost:8080/api/setups',
      {
        setupName: 'setup name',
        products: [
          {
            productName:
              'Apple 아이패드 에어 5세대 M1 WIFI 64G 스페이스 그레이 (MM9C3KH/A)',
            img: 'https://shopping-phinf.pstatic.net/main_3153084/31530843620.20220705164247.jpg',
            productCode: '31530843620',
            lprice: 828490,
            brand: 'Apple',
            maker: 'Apple',
            category1: '디지털/가전',
            category2: '태블릿PC',
            category3: 'string',
            category4: 'string',
            pages: [
              {
                price: 829690,
                link: 'https://search.shopping.naver.com/gate.nhn?id=31530843620',
                storeName: '네이버',
              },
            ],
          },
        ],
      },
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

export const deleteSetups = async (setupId: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/setups/${setupId}`,
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

export const getSetupDetail = async (setupId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/setups/${setupId}`,
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

export const deleteSetupGoods = async (
  setupId: number,
  setupProductId: number
) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/setups/${setupId}/${setupProductId}`,
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
