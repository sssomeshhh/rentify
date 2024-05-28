FROM node:current-bullseye-slim as fe
RUN corepack enable
WORKDIR /root/fe
COPY ./fe/package.json .
COPY ./fe/yarn.lock .
RUN yarn install
COPY ./fe .
RUN yarn produce

FROM mongo:latest as fs
RUN apt-get update && \
    apt-get install --yes curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install --yes nodejs && \
    corepack enable
COPY --from=sssomeshhh/rentify:fe /root/fe/build /root/fe/build
WORKDIR /root/be
COPY ./be/package.json .
COPY ./be/yarn.lock .
RUN yarn install
COPY ./be .
ENV SERVER_PORT=80
EXPOSE 80
ENV IS_EVAL=true
RUN echo "mongod > /dev/null 2>&1 & disown ; yarn produce ;" > startApp
CMD bash ./startApp
