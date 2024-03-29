# Use a lightweight Node.js image as the base
FROM node:18.12.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Generate build
RUN npm run build

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
