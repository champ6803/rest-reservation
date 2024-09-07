# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the app dependencies
RUN npm install --production

# Copy the rest of the application source code to the container
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port (default port for NestJS is 3000)
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:prod"]