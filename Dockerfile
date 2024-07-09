FROM node AS build

WORKDIR /app

COPY package*.json ./
RUN npm install -g dotenv-cli cross-env
RUN npm install

COPY . .

ENV NODE_ENV=production

RUN npm run build:prod

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
