import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const LoginContainer = styled.div`
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
  cursor: pointer;
`;

const Line = styled.div`
  border: 0;
  height: 0.1vh;
  background: #fff;
  width: 24vw;
  margin-top: 1.5%;
`;
const HelpTextContainer = styled.div`
  margin-top: 1%;
  width: 24vw;
  display: flex;
  justify-content: space-between;
`;
const HelpTextContainer1 = styled.p`
  color: #ffffff;
`;

const HelpTextContainer2 = styled.div`
  height: 2vh;
`;
const StyledLink = styled(Link)`
  // 스타일이 적용된 링크 컴포넌트 정의
  color: #ffffff;
  text-decoration: none;
  font-size: 6rem;
`;
const StyledLink1 = styled(Link)`
  // 스타일이 적용된 링크 컴포넌트 정의
  color: #349af8;
  text-decoration: none;
  font-size: 1rem;
`;

const Login = () => {
  return (
    <LoginContainer>
      <Title>
        <StyledLink to="/">On My Desk!</StyledLink>
      </Title>

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
          type="password"
          sx={{
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
        Login
      </Button>
      <Line />
      <HelpTextContainer>
        <HelpTextContainer1>계정이 없나요?</HelpTextContainer1>{' '}
        <HelpTextContainer2>
          <Button href="#text-buttons" sx={{ mt: 1 }}>
            <StyledLink1 to="/signup">회원가입</StyledLink1>
          </Button>
        </HelpTextContainer2>
      </HelpTextContainer>
    </LoginContainer>
  );
};

export default Login;
