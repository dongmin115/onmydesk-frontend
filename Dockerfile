# 베이스 이미지 설정
FROM node:20.10.0-alpine

WORKDIR /frontend

# 소스 코드 복사
COPY ./package.json ./

RUN yarn

COPY . ./

CMD ["yarn", "dev"]