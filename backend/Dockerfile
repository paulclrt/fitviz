FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --production &&\
     npm clean cache --force

COPY --from=build /app/dist ./dist
RUN addgroup app && adduser -S -G app app
USER app

CMD ["node", "dist/main.js"]
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8080/ || exit 1
