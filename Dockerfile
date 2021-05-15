FROM node:14 AS BUILD_IMAGE


COPY . /app/
WORKDIR /app/status_page_backend

RUN yarn install 
RUN yarn build

WORKDIR /app/status_page_frontend

RUN yarn install 
RUN yarn build

FROM node:14-alpine

WORKDIR /app

COPY --from=BUILD_IMAGE /app/status_page_backend/dist ./dist
COPY --from=BUILD_IMAGE /app/status_page_backend/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/status_page_frontend/build ./build

EXPOSE 3000

CMD [ "node", "dist/server.js" ]