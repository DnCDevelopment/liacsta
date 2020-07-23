FROM node:14 as build-deps
WORKDIR /app/client
COPY ./package*.json ./
RUN npm ci
COPY ./ ./
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-deps /app/client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]