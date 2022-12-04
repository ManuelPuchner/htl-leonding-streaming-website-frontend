FROM node:alpine AS my-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build-prod

FROM nginx:alpine
COPY --from=my-app-build /app/dist/streaming-frontend /usr/share/nginx/html
EXPOSE 80
