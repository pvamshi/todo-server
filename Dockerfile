# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app
# COPY package.json and package-lock.json files
# COPY package*.json ./

# generated prisma files
# COPY prisma ./prisma/

# COPY ENV variable
# COPY .env ./

# COPY tsconfig.json file
# COPY tsconfig.json ./

# COPY
COPY . .
RUN npm install
RUN npm run build
# RUN npx prisma generate
EXPOSE 3000
CMD ["npm","run", "serve"]
