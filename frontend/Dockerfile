FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
