FROM node:current-bullseye-slim as xe
RUN corepack enable
ARG XE
WORKDIR /root/$XE
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

FROM xe as be
RUN yarn produce

FROM xe as fe
RUN yarn produce

FROM ubuntu:noble as fs
WORKDIR /root/fs
COPY --from=be /root/be/ .
COPY --from=fe /root/fe/ .
