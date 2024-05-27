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
COPY --from=rentify:fe /root/fe/build /root/fe/build
EXPOSE 8000
EXPOSE 8080
CMD yarn produce

FROM base as fe
RUN yarn produce
