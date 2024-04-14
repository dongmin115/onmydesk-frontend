import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Login } from '../api/User';

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

const LoginPage = () => {
  const navigate = useNavigate();
  // zod를 사용하여 회원가입 폼의 유효성 검사
  const signUpFormSchema = z.object({
    email: z.string().email({ message: '이메일 형식이 아닙니다.' }), // 이메일 형식 지정
    password: z // 비밀번호 형식 지정 (문자와 숫자가 혼합된 8~20자리)
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/,
        '문자와 숫자가 혼합된 8~20자리의 비밀번호를 입력해주세요.'
      ),
  });

  // 회원가입 폼의 타입 지정
  type SignUpFormValues = z.infer<typeof signUpFormSchema>;

  // 회원가입 폼의 기본값 설정
  const defaultValues: SignUpFormValues = {
    email: '',
    password: '',
  };

  // useForm을 사용하여 회원가입 폼의 상태 관리
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues,
    mode: 'all',
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <LoginContainer>
      <Title>
        <StyledLink to="/">On My Desk!</StyledLink>
      </Title>
      <FormProvider {...form}>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > :not(style)': { width: '24vw' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            inputMode="email"
            margin="dense"
            error={!!errors.email}
            {...register('email')}
            helperText={
              <span style={{ color: errors.email ? '#FF0040' : '#349af8' }}>
                {errors.email
                  ? errors.email.message
                  : '사용가능한 이메일입니다.'}
              </span>
            }
            sx={{
              width: '100%',
              '& label': {
                color: '#ffffff',
              },
              '& fieldset': {
                borderColor: errors.email ? '#FF0040' : '#349af8',
              },
              '& input': {
                color: 'white',
              },
            }}
          />
          <TextField
            id="outlined-basic"
            label="PASSWORD"
            variant="outlined"
            margin="dense"
            type="password"
            error={!!errors.password}
            {...register('password')}
            helperText={
              <span style={{ color: errors.password ? '#FF0040' : '#349af8' }}>
                {errors.password
                  ? errors.password.message
                  : '사용가능한 비밀번호입니다.'}
              </span>
            }
            sx={{
              width: '100%',
              '& label': {
                color: '#ffffff',
              },
              '& fieldset': {
                borderColor: errors.password ? '#FF0040' : '#349af8',
              },
              '& input': {
                color: 'white',
              },
            }}
          />
        </Box>
      </FormProvider>
      <Button
        variant="contained"
        sx={{ mt: 2, width: '24.2vw' }}
        onClick={async () => {
          const response = await Login(form.getValues());
          if (response.status === 'success') {
            alert('로그인 성공');
            navigate('/');
          } else if (response.status === 'fail') {
            alert('이메일 또는 비밀번호가 틀렸습니다.');
          }
        }}
      >
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

export default LoginPage;
