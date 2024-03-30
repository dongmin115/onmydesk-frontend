import styled from 'styled-components';

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
      <Input type="text" placeholder="ID" />
      <Input type="password" placeholder="PASSWORD" />
      <Input type="password" placeholder="CONFIRM PASSWORD" />
      <Input type="text" placeholder="USERNAME" />
      <LoginButton>SIGN UP</LoginButton>
    </SignupContainer>
  );
};

export default Signup;
