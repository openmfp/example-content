FROM node:22.11 AS build

COPY frontend/package.json frontend/package-lock.json /app/frontend/

WORKDIR /app/frontend
RUN npm ci

COPY /frontend ./
RUN npm run build-prod
RUN npm run build:wc

FROM nginx:alpine
COPY --from=build /app/frontend/dist/ /usr/share/nginx/html/ui/example-content/ui/
COPY --from=build /app/frontend/dist-wc/ /usr/share/nginx/html/ui/example-content/wc/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080