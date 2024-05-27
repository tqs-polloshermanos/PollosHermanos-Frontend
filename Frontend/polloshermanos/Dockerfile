# build the React app
FROM node:14 AS build

# set the working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# configure npm to use a different registry
RUN npm config set registry https://registry.npmjs.org/

# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# build the React application
RUN npm run build

# serve the React app using nginx
FROM nginx:alpine

# copy the build output to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# expose port 80
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]

# docker run -d -p 8080:80 polloshermanos_frontend

