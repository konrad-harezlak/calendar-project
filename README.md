# Calendar Project

Welcome to the Calendar Project! This web application, built using React, Node.js, and MongoDB, aims to provide users with features for registration, login, and managing appointments. Please note that the backend is under development, and the current version focuses on the frontend components and user interface.

## Technologies Used

- Javascript(React.js)
- Node.js
- MongoDB
- HTML
- CSS
- react-router-dom
- useState hook

### Additional Dependencies

- [@fortawesome/fontawesome-svg-core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core) v6.4.2
- [@fortawesome/free-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons) v6.4.2
- [@fortawesome/react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) v0.2.0
- [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom) v5.17.0
- [@testing-library/react](https://www.npmjs.com/package/@testing-library/react) v13.4.0
- [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event) v13.5.0
- [axios](https://www.npmjs.com/package/axios) v1.6.0
- [react-dom](https://www.npmjs.com/package/react-dom) v18.2.0
- [react-scripts](https://www.npmjs.com/package/react-scripts) v5.0.1
- [react](https://www.npmjs.com/package/react) v18.2.0
- [web-vitals](https://www.npmjs.com/package/web-vitals) v2.1.4
- [bcrypt](https://www.npmjs.com/package/bcrypt) v5.1.1
- [body-parser](https://www.npmjs.com/package/body-parser) v1.20.2
- [cors](https://www.npmjs.com/package/cors) v2.8.5
- [dotenv](https://www.npmjs.com/package/dotenv) v16.3.1
- [ejs](https://www.npmjs.com/package/ejs) v3.1.9
- [express](https://www.npmjs.com/package/express) v4.18.2
- [gridfs-stream](https://www.npmjs.com/package/gridfs-stream) v1.1.1
- [image-type](https://www.npmjs.com/package/image-type) v5.2.0
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) v9.0.2
- [mongodb](https://www.npmjs.com/package/mongodb) v6.2.0
- [mongoose](https://www.npmjs.com/package/mongoose) v7.6.3
- [multer](https://www.npmjs.com/package/multer) v1.4.5-lts.1
- [nodemon](https://www.npmjs.com/package/nodemon) v3.0.1

## Project Overview

### You can find deployed project below:
### [Calendar Page](https://calendar-frontend-brl8.onrender.com/calendar)
**Users:**
- L:Konrad P:Harezlak
- L:Ryszard P:peja
- L:Pudzian P:pudzian
- L:Witkor P:Ruda

The project is divided into different sections:

### Authentication

- **Registration:** Users can create a new account with their email and password.
- **Login:** Registered users can log in to their accounts securely.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/b3cb05ea-75f0-49a0-9bf5-662fed951e4a)


### Profile
  
- **Home:** Users can view their profile information and basic details.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/bbe44c13-38d5-4602-9a6d-77a9ce42484e)

- **Calendar:** Calendar view.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/d44574b9-6003-4c6f-aee5-6ab57c21dbbb)

- **Day schedule:** A feature allowing users to manage appointments and schedule future meetings with other users.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/ad7f687a-96d5-4b9f-a448-28a1be07061c)

- **Messages:** Users can send and receive messages with other users.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/8c64a957-1641-43b4-b4f6-fd96a7f1a8f1)


- **Pomodoro:** User can use pomodoro timer.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/898591df-d050-4605-ac32-533f7bfab205)


- **Settings:** Options for users to change their password and profile picture.
![image](https://github.com/konrad-harezlak/calendar-project/assets/146349083/1d610f95-ac8d-4530-8090-9934576ceabc)


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
npm install @fortawesome/fontawesome-svg-core@6.4.2 @fortawesome/free-solid-svg-icons@6.4.2 @fortawesome/react-fontawesome@0.2.0 @testing-library/jest-dom@5.17.0 @testing-library/react@13.4.0 @testing-library/user-event@13.5.0 axios@1.6.0 react-dom@18.2.0 react-router-dom@6.18.0 react-scripts@5.0.1 react@18.2.0 web-vitals@2.1.4
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

### Additional Steps
If you encounter installation issues, make sure you have Node.js and npm installed on your system.

## Project Status
The frontend components and user interface are implemented, while the backend and database integration are still in progress. Contributions are welcome!


**Feel free to get in touch if you have any questions or would like to collaborate!**
