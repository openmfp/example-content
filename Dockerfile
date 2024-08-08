FROM node:20.11 as build

COPY frontend/package.json frontend/package-lock.json /app/frontend/

WORKDIR /app/frontend
RUN npm ci

COPY /frontend ./
RUN npm run build-prod

FROM nginx:alpine
COPY --from=build /app/frontend/dist/browser/ /usr/share/nginx/html/ui/example-content
COPY static/ /usr/share/nginx/html/ui/static
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080