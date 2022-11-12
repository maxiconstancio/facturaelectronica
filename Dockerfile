FROM node:16-alpine3.15
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]