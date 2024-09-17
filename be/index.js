const express = require('express');

const app = express(); // This is a built-in middleware function in Express. It is used to create the Express application.
const cors = require('cors'); 
require("./configs/configsMongoDB"); // This is a custom middleware function that connects to MongoDB.

app.use(express.json()); // This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(cors()); // This is a built-in middleware function in Express. It enables all CORS requests.

const LoginController = require("./Controllers/LoginController"); // This is a custom middleware function that requires the LoginController.
app.use("/auth", LoginController); // This is a built-in middleware function in Express. It mounts the specified middleware function or functions at the specified path.

const adminController = require("./Controllers/AdminController"); // This is a custom middleware function that requires the AdminController.
app.use("/admin", adminController); // This is a built-in middleware function in Express. It mounts the specified middleware function or functions at the specified path.

const port = 8000; // This is the port number that the server will listen on.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`) // This is a built-in method in Express. It binds and listens for connections on the specified port.
});
