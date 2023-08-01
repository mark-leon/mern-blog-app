# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your Node.js app is running on (change 8080 to your desired port)
EXPOSE 8080

# Environment variables for PostgreSQL connection
ENV PG_HOST=postgres
ENV PG_PORT=5432
ENV PG_DATABASE=testdb
ENV PG_USERNAME=postgres
ENV PG_PASSWORD=new_password

# (Optional) You may also want to set other environment variables for your app, e.g., JWT_SECRET, etc.

# Wait for PostgreSQL to start (you can use a tool like wait-for-it.sh)
# This assumes that you have a script named wait-for-it.sh in the same directory
# as your Dockerfile. The script is used to wait for the PostgreSQL container to be ready before starting the app.
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

# Start the application using the 'npm start' command
CMD ./wait-for-it.sh $PG_HOST:$PG_PORT -t 60 -- npm start