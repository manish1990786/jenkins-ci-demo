# Use official Node.js image
FROM node:16

# Set working directory
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
