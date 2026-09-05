FROM node:24.20@sha256:be23f54a88d34e8824c741b19b91064094f92c1c97b194144bfc8b50d67258e2 AS build

COPY frontend/package.json frontend/package-lock.json /app/frontend/

WORKDIR /app/frontend
RUN npm ci

COPY /frontend ./
RUN npm run build-prod
RUN npm run build:wc

FROM nginxinc/nginx-unprivileged:alpine@sha256:601c823234c474696ded03d619e67f1e59538802731543099c691aea67e4a553
USER 101


COPY --from=build /app/frontend/dist/ /usr/share/nginx/html/ui/example-content/ui/
COPY --from=build /app/frontend/dist-wc/ /usr/share/nginx/html/ui/example-content/wc/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080