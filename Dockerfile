FROM node:24.14@sha256:80fc934952c8f1b2b4d39907af7211f8a9fff1a4c2cf673fb49099292c251cec AS build

COPY frontend/package.json frontend/package-lock.json /app/frontend/

WORKDIR /app/frontend
RUN npm ci

COPY /frontend ./
RUN npm run build-prod
RUN npm run build:wc

FROM nginxinc/nginx-unprivileged:alpine@sha256:42a7d7f2ee23e9f5a1dcdf3647ba5c585bbd18f79e79cd817e70e8cd61c55779
USER 101


COPY --from=build /app/frontend/dist/ /usr/share/nginx/html/ui/example-content/ui/
COPY --from=build /app/frontend/dist-wc/ /usr/share/nginx/html/ui/example-content/wc/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080