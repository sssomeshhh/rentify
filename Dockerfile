FROM node:current-bullseye-slim as fe
RUN corepack enable
COPY ./fe /root
WORKDIR /root/fe
RUN yarn install
RUN yarn produce

FROM mongo:latest as fs
RUN apt-get update && \
    apt-get install --yes curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install --yes nodejs && \
    corepack enable
COPY --from=sssomeshhh/rentify:fe /root/fe/build /root/fe/build
COPY ./be /root
WORKDIR /root/be
RUN yarn install
ENV SERVER_PORT=80
EXPOSE 80
RUN echo "mongod > /dev/null 2>&1 & disown ; yarn produce ;" > startApp
CMD bash ./startApp
