FROM node:current-bullseye-slim as xe
RUN corepack enable
ARG XE
WORKDIR /root/$XE
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn produce

FROM xe as fe

FROM xe as be
RUN mv dist/fs.cjs ./ && \
    node --experimental-sea-config sea.json && \
    cp /usr/local/bin/node ./fs && \
    npx postject fs NODE_SEA_BLOB fs.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2

FROM ubuntu:noble as fs
WORKDIR /root/fs
COPY --from=sssomeshhh/rentify:be /root/be/fs .
COPY --from=sssomeshhh/rentify:fe /root/fe/build ./fe
ENV NODE_NO_WARNINGS=1 IS_EVAL=true SERVER_PORT=80
CMD ./fs

FROM mongo:latest as rn
WORKDIR /root/rn
COPY --from=sssomeshhh/rentify:fs /root/fs .
ENV NODE_NO_WARNINGS=1 IS_EVAL=true SERVER_PORT=80
RUN echo "mongod > /dev/null 2>&1 & disown ; ./fs ;" > stRn
CMD bash ./stRn
