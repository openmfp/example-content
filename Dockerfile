FROM node:22.10 as build

COPY frontend/package.json frontend/package-lock.json /app/frontend/

WORKDIR /app/frontend
RUN npm ci

COPY /frontend ./
RUN npm run build-prod
RUN npm run build:wc

FROM nginx:alpine
COPY --from=build /app/frontend/dist/ /usr/share/nginx/html/ui/example-content
COPY --from=build /app/frontend/dist-wc/ /usr/share/nginx/html/ui/wc
COPY static/ /usr/share/nginx/html/ui/static
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080