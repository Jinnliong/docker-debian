# Use debian:bookworm as the base image
FROM debian:bookworm

# Install curl
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js version 12.x along with npm
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y nodejs npm

# Verify the installation
RUN curl --version && \
    node -v && \
    npm -v

# Set working directory
WORKDIR /app

COPY . /app

# Install application dependencies
RUN npm install

# Expose port
EXPOSE 8080

# Entry point
CMD ["node", "index.js"]