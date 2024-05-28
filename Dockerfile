FROM node:current-bullseye-slim as xe
RUN corepack enable
ARG XE
WORKDIR /root/$XE
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn produce

FROM xe as be

FROM xe as fe

FROM ubuntu:noble as fs
WORKDIR /root/fs
COPY --from=be /root/be/ .
COPY --from=fe /root/fe/ .
