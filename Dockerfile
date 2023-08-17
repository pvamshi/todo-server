# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app
# COPY package.json and package-lock.json files
COPY package*.json ./

RUN npm install
# generated prisma files
# COPY prisma ./prisma/

# COPY ENV variable
# COPY .env ./

# COPY tsconfig.json file
# COPY tsconfig.json ./

# COPY
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm","run", "serve"]
