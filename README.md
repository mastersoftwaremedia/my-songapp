[![Heroku - View on Heroku](https://img.shields.io/badge/Heroku-View_on_Heroku-red?logo=Heroku&logoColor=white)](https://my-songapp.herokuapp.com/)
![NPM](https://badgen.net/npm/v/express)


# my-songapp
Created MERN mini song library application for any songs that left a lasting impression on hearts of people ❤️


## **Project Setup**

**Server**

```
npm install
```

```

  "scripts": {
    "start": "node server/index",
    "server": "nodemon server/index"
  },

```

```
npm run server
```


**Add Credentials**

Make sure to use Git Bash if you use windows to create a .env file at the root directory of your application to hide all your sensitive information

```
touch .env
```
Add following variables to .env file:

```
NODE_ENV=DEVELOPMENT

DB_URI=

JWT_SECRET=
JWT_EXPIRES_TIME=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET= 
```

### client

```
npm start
```
Login with existing ID and password: john@gmail.com / 123456
