# Image Uploader
This is a simple App created in order to show my way to manage images. 
It is a project I want to preserve in my repo.

## Deployed App
In the following URL you will see my deployed version in Heroku: https://rodri-image-uploader.herokuapp.com/ 

## Steps to clone the repo
1. When you clone my repo in your code editor, first you need to write on your terminal "npm install" in the root folder and then "npm install" in the "client" folder. This will install all the dependencies I use in this project.
2. Then you need to change the App.js file inside the "src" folder, delete line 4 the "axiosInstance" import, and replace it with:  "import axiosInstance from 'axios';" in order to axios use your localhost correcty.
3. After that, you need to stay in the "client" folder, and write: "npm run build" and then "npm run start"
4. Your project will be ready on your localhost:3000, and you will be able to make all the changes you want.

Note: If you need to change the port, you need to modify the .env file.
