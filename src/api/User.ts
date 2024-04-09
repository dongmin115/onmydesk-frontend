import axios from 'axios';
import { User } from '../types/User';

export const SignUp = async (jsonData: User) => {
  const response = await axios.post(
    'http://localhost:8080/api/signup',
    jsonData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
