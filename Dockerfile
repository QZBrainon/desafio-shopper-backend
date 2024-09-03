# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /app

# Expose port 3000 for the app.
EXPOSE 3000

# Copy application dependency manifests.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy the source code.
COPY . .

# Build the TypeScript code.
RUN npm run build

# Start the application.
CMD ["npm", "start"]


