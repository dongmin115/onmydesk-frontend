import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SignUp } from '../api/User';
import { useState } from 'react';
import { z } from 'zod';
const SignupContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  color: #ffffff;
  font-family: 'Explora-Regular';
  margin-bottom: 4%;
  font-size: 6rem;
`;

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [name, setName] = useState<string>('');
  const jsonData = {
    email: email,
    password: password,
    nickname: nickname,
    name: name,
  };

  const signUpFormSchema = z
    .object({
      email: z.string().email({ message: '이메일 형식이 아닙니다.' }), // 이메일 형식 지정
      password: z // 비밀번호 형식 지정 (문자와 숫자가 혼합된 8~20자리)
        .string()
        .regex(
          /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/,
          '문자와 숫자가 혼합된 8~20자리의 비밀번호를 입력해주세요.'
        ),
      confirmPassword: z.string(),
      nickname: z.string(),
      name: z.string(),
    })
    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: '비밀번호가 일치하지 않습니다.',
    });
  return (
    <SignupContainer>
      <Title>On My Desk!</Title>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '24vw' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="EMAIL"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: '100%',
            '& label': {
              color: '#ffffff',
            },
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: '#349af8',
            },
            '& input': {
              color: 'white',
            },
          }}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '24vw' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="PASSWORD"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            width: '100%',
            '& label': {
              color: '#ffffff',
            },
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: '#349af8',
            },
            '& input': {
              color: 'white',
            },
          }}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '24vw' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="CONFIRM PASSWORD"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            width: '100%',
            '& label': {
              color: '#ffffff',
            },
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: '#349af8',
            },
            '& input': {
              color: 'white',
            },
          }}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '24vw' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="USERNAME"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            width: '100%',
            '& label': {
              color: '#ffffff',
            },
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: '#349af8',
            },
            '& input': {
              color: 'white',
            },
          }}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '24vw' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="NICKNAME"
          variant="outlined"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          sx={{
            width: '100%',
            '& label': {
              color: '#ffffff',
            },
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: '#349af8',
            },
            '& input': {
              color: 'white',
            },
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{ mt: 2, width: '24.2vw' }}
        onClick={() => SignUp(jsonData)}
      >
        SIGN UP
      </Button>
    </SignupContainer>
  );
};

export default Signup;
