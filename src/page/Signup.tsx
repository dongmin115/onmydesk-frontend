import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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

const Input = styled.input`
  font-size: 1rem;
  padding: 1.1%;
  margin: 1% 0;
  border: none;
  border-radius: 0.3rem;
  outline: none;
  width: 22vw;
  height: 2vh;
`;

const LoginButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.3rem;
  margin-top: 1%;
  width: 24.3vw;
  height: 6vh;
  cursor: pointer;
  font-family: 'Kiwi Maru';
  font-size: 1rem;
`;

const Signup = () => {
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
          label="ID"
          variant="outlined"
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
      <Button variant="contained" sx={{ mt: 2, width: '24.2vw' }}>
        SIGN UP
      </Button>
    </SignupContainer>
  );
};

export default Signup;
