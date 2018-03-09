# What image do you want to start building on?
FROM node:8.2.1

# Make a folder in your image where your app's source code can live
RUN mkdir /q-a-service

# Tell your container where your app's source code will live
WORKDIR /q-a-service

# What source code do you what to copy, and where to put it?
COPY . /q-a-service

# Does your app have any dependencies that should be installed?
RUN npm install

# What port will the container talk to the outside world with once created?
EXPOSE 3004

# How do you start your app?
CMD ["npm", "start"]



# Set proxy server, replace host:port with values for your servers
# ENV http_proxy host:port
# ENV https_proxy host:port