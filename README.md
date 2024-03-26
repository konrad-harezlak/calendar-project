# Welcome to the Calendar Project!

This web application, built using React, Node.js, and MongoDB, provides users with features for registration, login, managing appointments, and now, managing todo tasks. The project is optimized for responsiveness, ensuring a seamless user experience across various devices.

## Technologies Used

- HTML
- CSS
- Javascript
- React.js
- Node.js
- MongoDB

## Project Overview

### You can find deployed project below:

### [Calendar Page](https://calendar-frontend-brl8.onrender.com/calendar)
**Please note that the project is hosted on a free website, and upon visiting the site, it may take a few minutes for the backend to load.**

**Users:**
- L: Konrad P: Harezlak
- L: Ryszard P: peja
- L: Pudzian P: pudzian
- L: Witkor P: Ruda
  


## The project is divided into different sections:

### Authentication

- **Registration:** Users can create a new account with their email and password.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/a79776ca-8951-4c2e-8f47-cfa6164bcea7)

- **Login:** Registered users can log in to their accounts securely.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/3442b065-c0b2-4bf1-8ae8-f59f377fa819)



### Profile
  
- **Home:** Users can view their profile information and basic details.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/b8a20aea-e439-4a85-98eb-0c4d9ea00b53)


- **Calendar:** Calendar view.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/46eb7a97-71fd-431f-8203-bcb90c6e952b)

- **Day schedule:** A feature allowing users to manage appointments and schedule future meetings with other users.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/ad7f687a-96d5-4b9f-a448-28a1be07061c)

- **Messages:** Users can send and receive messages with other users.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/efa3d382-e6fd-440a-8051-0475076c0042)

- **Pomodoro:** User can use pomodoro timer.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/09de1ffc-8442-4b8e-a43a-5657f3822242)

- **Todo:** Users can manage their todo tasks. Drag & Drop functionality.
  
  **Grid**
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/b7412216-9b38-44b0-8f7e-5ae5c12fc6f2)
  **List**
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/f3d23fd4-0f73-46bd-b215-2d25483be110)

- **Settings:** Options for users to change their password and profile picture.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/94ae784b-b40f-4ca3-9067-827c82c04115)



## Dependencies

### Client Side (React)

- **[@fortawesome/fontawesome-svg-core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core)** v6.4.2
- **[@fortawesome/free-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons)** v6.4.2
- **[@fortawesome/react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome)** v0.2.0
- **[@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)** v5.17.0
- **[@testing-library/react](https://www.npmjs.com/package/@testing-library/react)** v13.4.0
- **[@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event)** v13.5.0
- **[axios](https://www.npmjs.com/package/axios)** v1.6.0
- **[drag-drop-touch](https://www.npmjs.com/package/drag-drop-touch)** v1.3.1
- **[react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend)** v16.0.1
- **[react-dnd](https://www.npmjs.com/package/react-dnd)** v16.0.1
- **[react-dom](https://www.npmjs.com/package/react-dom)** v18.2.0
- **[react-router-dom](https://www.npmjs.com/package/react-router-dom)** v6.18.0
- **[react-scripts](https://www.npmjs.com/package/react-scripts)** v5.0.1
- **[react](https://www.npmjs.com/package/react)** v18.2.0
- **[web-vitals](https://www.npmjs.com/package/web-vitals)** v2.1.4

### Server Side (Node.js)

- **[axios](https://www.npmjs.com/package/axios)** v1.5.1
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** v5.1.1
- **[body-parser](https://www.npmjs.com/package/body-parser)** v1.20.2
- **[cors](https://www.npmjs.com/package/cors)** v2.8.5
- **[dotenv](https://www.npmjs.com/package/dotenv)** v16.3.1
- **[ejs](https://www.npmjs.com/package/ejs)** v3.1.9
- **[express](https://www.npmjs.com/package/express)** v4.18.2
- **[gridfs-stream](https://www.npmjs.com/package/gridfs-stream)** v1.1.1
- **[image-type](https://www.npmjs.com/package/image-type)** v5.2.0
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** v9.0.2
- **[mongodb](https://www.npmjs.com/package/mongodb)** v6.2.0
- **[mongoose](https://www.npmjs.com/package/mongoose)** v7.6.3
- **[multer](https://www.npmjs.com/package/multer)** v1.4.5-lts.1
- **[nodemon](https://www.npmjs.com/package/nodemon)** v3.0.1

### Project Structure

- **/server:** Backend logic and API endpoints (under development).
- **/client:** Frontend pages and components for different sections.

## How to Install

Clone this repository to your local machine:

```bash
git clone https://github.com/konrad-harezlak/calendar-project
```

### Client Side (React)

Navigate to the client directory

```bash
cd calendar-project/client
```

Run the following command in the terminal to install all required client dependencies:

```bash
npm install @fortawesome/fontawesome-svg-core@6.4.2 @fortawesome/free-solid-svg-icons@6.4.2 @fortawesome/react-fontawesome@0.2.0 @testing-library/jest-dom@5.17.0 @testing-library/react@13.4.0 @testing-library/user-event@13.5.0 axios@1.6.0 drag-drop-touch@1.3.1 react-dnd-html5-backend@16.0.1 react-dnd@16.0.1 react-dom@18.2.0 react-router-dom@6.18.0 react-scripts@5.0.1 react@18.2.0 web-vitals@2.1.4
```
Run the client project

```bash
npm start
```

The React application should now be accessible at http://localhost:3000/.

### Server Side (Node.js)
Navigate to the server directory

```bash
cd calendar-project/server
```

Install server dependencies

```bash
npm install axios@1.5.1 bcrypt@5.1.1 body-parser@1.20.2 cors@2.8.5 dotenv@16.3.1 ejs@3.1.9 express@4.18.2 gridfs-stream@1.1.1 image-type@5.2.0 jsonwebtoken@9.0.2 mongodb@6.2.0 mongoose@7.6.3 multer@1.4.5-lts.1 nodemon@3.0.1
```

Run the server
```bash
npm start
```


### How to Configure API
**If you need to customize the API address and port, follow these steps:**

Open the file calendar-project/client/src/api.js.

Locate the following lines:

```javascript
import axios from 'axios';

const baseURL = "http://localhost:4000";  // Change this to your desired API address and port

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
```

Change the baseURL to your desired API address and port.
The Node.js server should now be running on the default port (e.g., http://localhost:4000/).

### Add link to your own Database

Add a link to your own database in db.js:

javascript
```
const mongoose = require('mongoose');
require('dotenv').config();
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@db.380bxnf.mongodb.net/?retryWrites=true&w=majority&appName=db`; // Add here your db URI.
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the database:'));
db.once('open', () => {
  console.log('Connected to the MongoDB database');
});

module.exports = db;
```
**Make sure to replace MONGO_USERNAME and MONGO_PASSWORD with your actual MongoDB username and password. Adjust the uri variable to match your MongoDB database URL.**




### Additional Steps
If you encounter installation issues, make sure you have Node.js and npm installed on your system.

## Project Status
The project is completed, though there might be some minor tweaks and adjustments in the near future.


**Feel free to get in touch if you have any questions or would like to collaborate!**
