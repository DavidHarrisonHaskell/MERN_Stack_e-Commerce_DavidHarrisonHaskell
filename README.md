# MERN_Stack_e-Commerce_DavidHarrisonHaskell
<u> In Progress </u>
 <u>A MERN Stack website for e-Commerce, meant for customers, an admin, displaying products, showing statistics and more</u>

## Backend with Node.JS
By utilizing Node.JS, I established a server using express. The server performs CRUD operations with the MongoDB database and is able to send information to the frontend.

## File hierarchy for backend
The index file receives incoming requests from the client and directs the requests to the controllers folder. The various controllers utilize the services files to perform various operations. The services files use various repository files which utilize mongoose models to access the MongoDB database.

## Frontend with React and redux
Once information is pulled from the server, it is stored in the redux state. The information is then passed on to various React components to display information to the client.
