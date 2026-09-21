FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/empresti
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
