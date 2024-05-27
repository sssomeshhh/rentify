FROM node:current-bullseye-slim as base
RUN corepack enable
ARG XE
WORKDIR /root/$XE
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

FROM base as be
# RUN yarn produce

FROM base as fe
RUN yarn produce
