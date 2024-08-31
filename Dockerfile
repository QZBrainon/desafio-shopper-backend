# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /app

# Expose port 3000 for the app.
EXPOSE 3000

# Copy application dependency manifests.
COPY package*.json ./

# Copy the source code.
COPY . .

# Install production dependencies.
RUN npm install

# Build the TypeScript code.
RUN npm run build

# Start the application.
CMD ["npm", "start"]


