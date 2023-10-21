FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire application
COPY . .

# Build the project
RUN npm run build

# Create a production image
FROM node:18-alpine AS production

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app .

EXPOSE 8080

CMD ["npm", "start"]
