# Use the official Node.js image ---
  FROM node:14

  # Create and change to the app directory
  WORKDIR /usr/src/app

  # Copy package.json and package-lock.json
  COPY package*.json ./

  # Install app dependencies
  RUN npm install

  # Copy the rest of the application code
  COPY . .

  # Expose the port the app runs on
  EXPOSE 8081

  # Install nodemon globally
  RUN npm install -g knex
  RUN npm install -g nodemon

  # Run the application
  CMD ["nodemon", "./src/app.js"]