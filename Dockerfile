# Use official Node.js image
FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
