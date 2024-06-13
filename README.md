# PDF Reader



![logo](https://github.com/IT21252990/PDF_Reader/assets/89300552/e279035d-7b09-4e28-b453-3e0844baf8cd)



## Your Digital Reading Hub!

Welcome to the PDF Reader Application! This application allows users to easily manage and read their PDF documents online. With a user-friendly interface and robust functionality, our application ensures a seamless experience for managing and reading PDF files.

### Features

- **User Authentication**: Users can register for an account and log in securely.
- **PDF Upload**: Users can upload their PDF documents directly to the application.
- **Save PDF Documents**: Uploaded PDFs are saved in the user's account, allowing for easy access and management.
- **Read PDFs**: Users can read their PDF documents directly within the application, without needing to download them.
- **Responsive Design**: The application is designed to work smoothly on various devices, including desktops, tablets, and smartphones.

### How It Works

1. **Register/Login**: Users can create a new account or log in to an existing one.
2. **Upload PDFs**: Once logged in, users can upload their PDF files to the application.
3. **Manage PDFs**: Uploaded PDFs are saved to the user's account for easy access.
4. **Read PDFs**: Users can open and read their saved PDF files directly in the browser, providing a convenient reading experience.

The PDF Reader Application is built using the MERN stack (MongoDB, Express.js, React, Node.js), ensuring a fast and reliable performance. We hope you enjoy using our application to manage and read your PDF documents!


### How It Works

1. **Register**: Users can create a new account 
   ![Register](./screenshots/register.png)
2. **Login**: Users can log in to an existing account.
   ![Login](./screenshots/login.png)
3. **Upload PDFs and Manage PDFs**: Once logged in, users can upload their PDF files to the application. Uploaded PDFs are saved to the user's account for easy access.
   ![Home](./screenshots/home.png)
4. **Read PDFs**: Users can open and read their saved PDF files directly in the browser, providing a convenient reading experience.
   ![Read PDFs](./screenshots/read-pdfs.png)

## Technologies Used

### Frontend

- **@emotion/react**: A library for writing CSS styles with JavaScript, providing powerful and flexible styling capabilities.
- **@emotion/styled**: A companion to `@emotion/react` for creating styled components.
- **@headlessui/react**: Unstyled, fully accessible UI components, designed to integrate seamlessly with Tailwind CSS.
- **@heroicons/react**: A set of free MIT-licensed high-quality SVG icons for you to use in your web projects.
- **@mui/material**: A popular React UI framework offering a wide range of customizable components following Material Design guidelines.
- **@testing-library/jest-dom**: Custom jest matchers to test the state of the DOM.
- **@testing-library/react**: Simple and complete React DOM testing utilities that encourage good testing practices.
- **@testing-library/user-event**: Fire events to simulate user interactions in tests.
- **pdfjs-dist**: A general-purpose, web standards-based platform for parsing and rendering PDFs.
- **react**: A JavaScript library for building user interfaces.
- **react-dom**: Serves as the entry point to the DOM and server renderers for React.
- **react-pdf**: Display PDFs in your React app as easily as if they were images.
- **react-pdf-tailwind**: Integration of `react-pdf` with Tailwind CSS for better styling.
- **react-router-dom**: DOM bindings for React Router, enabling navigation in React applications.
- **react-scripts**: Scripts and configuration used by Create React App.
- **styled-components**: Allows you to use component-level styles in your application.
- **sweetalert2**: A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes.
- **web-vitals**: A library for measuring all the metrics that are essential for a healthy web.

#### Dev Dependencies

- **tailwindcss**: A utility-first CSS framework for rapidly building custom designs.

### Backend

- **bcrypt**: A library to help you hash passwords.
- **bcryptjs**: A JavaScript library to hash passwords in the backend.
- **cors**: A package for providing a Connect/Express middleware that can be used to enable CORS.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **express**: A fast, unopinionated, minimalist web framework for Node.js.
- **jsonwebtoken**: A library to work with JSON Web Tokens (JWT) for authentication.
- **mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **morgan**: HTTP request logger middleware for Node.js.
- **multer**: A middleware for handling `multipart/form-data`, primarily used for uploading files.
- **nodemon**: A tool that helps develop Node.js applications by automatically restarting the node application when file changes are detected.
- **validator**: A library for string validation and sanitization.
- **winston**: A logger for just about everything.



## Installation

#### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later) 
- [MongoDB](https://www.mongodb.com/)

#### Cloning the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/IT21252990/PDF_Reader.git
cd PDF_Reader
```

#### Setting Up the Server
Navigate to the server directory and install the dependencies:

```bash
cd server
npm install
```

#### Creating the .env File
Create a .env file in the server directory and add the following environment variables:

```env
PORT=your-port-number
MONGODB_CONNECTION_STRING=your-database
SECRET=your-jwt-secret
```
Replace `your-port-number` , `your-database`, `your-jwt-secret` with your configuration settings.

#### Start the server:

```bash
npm run dev
```
The server should now be running on http://localhost:`your-port-number`.

#### Setting Up the Client
Navigate to the client directory and install the dependencies:

```bash
cd ../client
npm install
```

#### Start the client:

```bash
npm start
```

The client should now be running on http://localhost:3000.

#### Running the Project
- Ensure MongoDB is running on your system.
- Start the server and client as described above.
- Open http://localhost:3000 in your browser to view the application.

#### Project Structure
``` bash
PDF_Reader/
│
├── backend/          # Express backend 
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── node_modules
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── combined.log
│   ├── error.log
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── frontend/          # React frontend
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── tailwind.config.js
│
├── .gitignore
└── README.md
```
    
## Author

- [Kalinga Jayathilaka](https://www.linkedin.com/in/kalingajayathilaka/)



## License

This project is licensed under the ISC License.
