# Activity 1a: Explore Debian and Build on It
## 1. Install the followings.
Install curl on Debian
execute: 
Update system, run: 

```sh
sudo apt update && sudo apt upgrade
```

```sh
sudo apt install cur
```

## 2. Run a debian container and exec into it
```sh
docker pull debian
```

```sh
docker run -it --name mydebian debian
```

The -it flag stands for interactive mode, allowing you to interact with the container.
--name mydebian gives your container a name (mydebian in this example).
Execute Commands Inside the Container:
Once the container is running, you can execute commands inside it. For example, to open a shell inside the Debian container, you can use the following command:

```sh
docker exec -it mydebian /bin/bash
```
## 2. Use the ping command to reach google.com (Ans: Not working)
## 3. Use the curl command to reach google.com (Ans: Not working)
## 4. Note the commands used to install curl
## 5. Use debian:bookworm as the base image, build a new image (name: my-nodejs:bookworm)
    -  Include the curl binary. Verify that it exists.
    -  Include v21.x of the node binary. Verify the binary version.

To create a Docker image based on the debian:bookworm image, including the curl binary and Node.js version 12.x, you can create a Dockerfile with the following contents:

Create a file named Dockerfile (without any file extension) with the following content:
Dockerfile

Copy code

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

Build the Docker image using the following command:
```sh
docker build -t my-nodejs:bookworm .
```

This command assumes that you are in the same directory as the Dockerfile.

Once the build is complete, you can run a container based on your new image:
```sh
docker run -it my-nodejs:bookworm
```

Inside the container, you can verify the presence of curl and the Node.js version by running the following commands:
```sh
curl --version
node -v
```

# Activity 1b: Containerize the App
Using the same Dockerfile from the last activity, extend on it to containerize our NodeJS application (here).

1. Build a new image (name: express-app:0.1)
2. Run the container and verify that your website is reachable

These commands will display the versions of curl and Node.js, respectively.

# Activity 1c: Environment Variables
Prompts
1. Replace the msg variable line to the following,
    - const msg = `Hello from ${ENV} environment`;
2. Rebuild the image and verify the changes
3. Replace the ENV variable line to the following,
    const ENV = process.env.APP_ENVIRONMENT || 'undefined';
4. Rebuild the image and verify the changes
5. Provide the environment variable when running the container such that it would not show ‘undefined’

## _Provide the environment variable when running the container such that it would not show ‘undefined’_
image is named express-app:v0.0.1, you can run the container with the following command:

```sh
docker run -e APP_ENVIRONMENT=production -p 8080:8080 express-app:v0.0.1
```

Replace production with the desired value for the APP_ENVIRONMENT variable. This command sets the environment variable inside the container before running it.

If you want to run the container in the background (detached mode), you can add the -d flag:

```sh
docker run -e APP_ENVIRONMENT=production -p 8080:8080 -d express-app:v0.0.1
```

## Push to AWS ECR

### Retrieve an authentication token and authenticate your Docker client to your registry.
Use the AWS CLI:
```sh
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com
```
Note: If you receive an error using the AWS CLI, make sure that you have the latest version of the AWS CLI and Docker installed.

### Build your Docker image using the following command. For information on building a Docker file from scratch see the instructions here . You can skip this step if your image is already built:
```sh
docker build -t jinnliong_ecr .
```
### After the build completes, tag your image so you can push the image to this repository:

```sh
docker tag jinnliong_ecr:latest 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com/jinnliong_ecr:latest
```

### Run the following command to push this image to your newly created AWS repository:
```sh
docker push 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com/jinnliong_ecr:latest
```