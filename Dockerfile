# Use official Node.js 18 image as base
FROM node:18.17.0

# Set working directory inside the container
WORKDIR /bevatel-chat-service-api/src

# Copy package.json and package-lock.json (if available) to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code to working directory
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]