# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:16-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use a smaller, lightweight base image for the production build
FROM nginx:stable-alpine

# Copy the built app from the previous stage to the NGINX web server directory
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Expose port 80 to access the NGINX server
EXPOSE 80

# Start NGINX server when the container starts
CMD ["nginx", "-g", "daemon off;"]
