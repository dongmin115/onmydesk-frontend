import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const Input = styled.input`
  font-size: 1rem;
  padding: 1.1%;
  margin: 0.5% 0;
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
const Line = styled.div`
  border: 0;
  height: 0.1vh;
  background: #fff;
  width: 24vw;
  margin-top: 3%;
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

const HelpTextContainer2 = styled.p`
  color: #349af8;
  cursor: pointer;
`;
const StyledLink = styled(Link)`
  // 스타일이 적용된 링크 컴포넌트 정의
  color: #ffffff;
  text-decoration: none;
  font-size: 6rem;
`;
const Login = () => {
  return (
    <LoginContainer>
      <Title>
        <StyledLink to="/">On My Desk!</StyledLink>
      </Title>
      <Input type="text" placeholder="ID" />
      <Input type="password" placeholder="PASSWORD" />
      <LoginButton>Login</LoginButton>
      <Line />
      <HelpTextContainer>
        <HelpTextContainer1>계정이 없나요?</HelpTextContainer1>{' '}
        <HelpTextContainer2>회원가입</HelpTextContainer2>
      </HelpTextContainer>
    </LoginContainer>
  );
};

export default Login;
