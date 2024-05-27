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

FROM mongo:latest as fs
RUN apt update && \
    apt install curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt install nodejs && \
    corepack enable
COPY --from=rentify:fe /root/fe/build /root/fe/build
COPY --from=rentify:be /root/be /root/be
WORKDIR /root/be
RUN yarn install
EXPOSE 8000
RUN echo "mongod > /dev/null 2>&1 & disown ; yarn produce ;" > startApp
CMD bash ./startApp
