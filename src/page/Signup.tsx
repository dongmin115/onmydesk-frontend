import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SignUp } from '../api/User';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
  // zod를 사용하여 회원가입 폼의 유효성 검사
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

  // 회원가입 폼의 타입 지정
  type SignUpFormValues = z.infer<typeof signUpFormSchema>;

  // 회원가입 폼의 기본값 설정
  const defaultValues: SignUpFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    name: '',
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
    trigger,
  } = form;

  return (
    <SignupContainer>
      <Title>On My Desk!</Title>
      <FormProvider {...form}>
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
            label="Email"
            variant="outlined"
            inputMode="email"
            error={!!errors.email}
            {...register('email')}
            helperText={
              <span style={{ color: errors.email ? 'red' : '#349af8' }}>
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
                borderColor: errors.email ? 'red' : '#349af8',
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
            {...register('password')}
            helperText={
              <span style={{ color: errors.password ? 'red' : '#349af8' }}>
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
                borderColor: errors.password ? 'red' : '#349af8',
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
            {...register('confirmPassword')}
            helperText={
              <span
                style={{ color: errors.confirmPassword ? 'red' : '#349af8' }}
              >
                {errors.confirmPassword
                  ? errors.confirmPassword.message
                  : '비밀번호가 일치합니다'}
              </span>
            }
            sx={{
              width: '100%',
              '& label': {
                color: '#ffffff',
              },
              '& fieldset': {
                borderColor: errors.confirmPassword ? 'red' : '#349af8',
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
            {...register('name')}
            helperText={
              <span style={{ color: errors.name ? 'red' : '#349af8' }}>
                {errors.name ? errors.name.message : '사용가능한 이름입니다.'}
              </span>
            }
            sx={{
              width: '100%',
              '& label': {
                color: '#ffffff',
              },
              '& fieldset': {
                borderColor: errors.name ? 'red' : '#349af8',
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
            {...register('nickname')}
            helperText={
              <span style={{ color: errors.nickname ? 'red' : '#349af8' }}>
                {errors.nickname
                  ? errors.nickname.message
                  : '사용가능한 별명입니다.'}
              </span>
            }
            sx={{
              width: '100%',
              '& label': {
                color: '#ffffff',
              },
              '& fieldset': {
                borderColor: errors.nickname ? 'red' : '#349af8',
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
          onClick={() => SignUp(form.getValues())}
        >
          SIGN UP
        </Button>
      </FormProvider>
    </SignupContainer>
  );
};

export default Signup;
