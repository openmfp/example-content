FROM node:20.11 as build

COPY frontend/package.json frontend/package-lock.json /app/frontend/
COPY backend/package.json backend/package-lock.json /app/backend/

WORKDIR /app/backend
RUN npm ci

WORKDIR /app/frontend
RUN npm ci

COPY /frontend ./
RUN npm run build

WORKDIR /app/backend
COPY /backend ./
RUN npm run build

FROM node:20.11.0-alpine

# Applications
COPY --from=build /app /app

WORKDIR /app/backend
EXPOSE 8080

CMD ["node", "index"]
