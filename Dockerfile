#Pull the node image from dockerhub
FROM node:14

#Create an directory and environment
WORKDIR /cc-app
ENV PATH="./npde_modules/.bin:$PATH"

#Pull the local directory and run the app
COPY . .
RUN npm run build
CMD ["npm", "start"]