import axios from 'axios';
import { User } from '../types/User';

export const SignUp = async (jsonData: User) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/signup',
      jsonData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    alert('회원가입이 완료되었습니다.');
    console.log(response.data);
    return response.data;
  } catch (error) {
    alert('회원가입에 실패했습니다.');
    return error;
  }
};

export const Login = async (jsonData: { email: string; password: string }) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/login',
      jsonData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    // 세션스토리지에 토큰 저장
    sessionStorage.setItem('token', response.data.data.token);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const putUserInfo = async (jsonData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.put(
      'http://localhost:8080/api/user',
      jsonData,
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
