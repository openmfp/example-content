FROM node:24.14@sha256:80fc934952c8f1b2b4d39907af7211f8a9fff1a4c2cf673fb49099292c251cec AS build

COPY frontend/package.json frontend/package-lock.json /app/frontend/

WORKDIR /app/frontend
RUN npm ci

COPY /frontend ./
RUN npm run build-prod
RUN npm run build:wc

FROM nginxinc/nginx-unprivileged:alpine@sha256:59ccf0943b0b8e8d9e6ea9039a39555730f544701a655c596f7df7d096c593f5
USER 101


COPY --from=build /app/frontend/dist/ /usr/share/nginx/html/ui/example-content/ui/
COPY --from=build /app/frontend/dist-wc/ /usr/share/nginx/html/ui/example-content/wc/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080