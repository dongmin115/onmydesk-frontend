import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SignUp } from '../api/User';
import { useState } from 'react';
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
