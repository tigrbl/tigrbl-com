FROM node:20-alpine AS build
WORKDIR /app
ARG SOURCE_COMMIT=unknown
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build \
    && printf '{"commit":"%s"}\n' "$SOURCE_COMMIT" > dist/deployment.json

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
