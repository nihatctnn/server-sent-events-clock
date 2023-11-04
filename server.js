// Import the Express framework
const express = require('express');

// Create an Express application
const app = express();

// Define the port to listen on
const port = 8000;

// Define a route for the root URL '/'
app.get('/', (req, res) => {
    // Log when a client connects
    console.log('---- Client is connected -----');

    // Set the response headers for Server-Sent Events (SSE)
    res.setHeader('Content-Type', 'text/event-stream');
    // The 'Content-Type' header is set to 'text/event-stream' to indicate that the response contains Server-Sent Events.

    res.setHeader('Access-Control-Allow-Origin', '*');
    // The 'Access-Control-Allow-Origin' header is set to '*' to allow cross-origin requests from any origin.


    // Create an interval to send data to the client every 1 second
    const intervalId = setInterval(() => {
        const date = new Date().toLocaleString();
        // Send data to the client
        res.write(`data: ${date} \n\n`);
    }, 1000);

    // Handle the client connection close event
    req.on('close', () => {
        console.log(`------ Client closed connection ------`);
        // Clear the interval and close the response
        clearInterval(intervalId);
        res.end();
    });
});

// Start the Express app and listen on the specified port
app.listen(port, () => {
    console.log(`---- Server running on port ${port} ----`);
});