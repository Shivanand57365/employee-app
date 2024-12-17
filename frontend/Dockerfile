# Frontend Dockerfile
# Use an official Node.js image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend
RUN npm run build

# Use Nginx to serve the frontend
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the frontend port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]