FROM node:alpine3.16

# Set Working Directory
WORKDIR /usr/src/app

# Copy Node Packages Requirement
COPY . .

# Install Node Modules Based On Node Packages Requirement
RUN  npm i -g npm \
    && npm i -g pm2 \
    && npm i -g ts-node \
    && npm i


# Run The Application
CMD npm run start
