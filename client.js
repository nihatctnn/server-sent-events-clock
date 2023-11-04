// Create an EventSource object to communicate with the server
const eventSource = new EventSource('http://localhost:8000')

// Function used to display a new message on the screen
function updateMessage(message) {
    const list = document.getElementById('messages')
    const item = document.createElement('p')
    item.textContent = message
    list.appendChild(item)
}

// Define an event listener for any message sent from the server

eventSource.onmessage = function (event) {
    // Use the 'updateMessage' function to display the received message on the screen
    updateMessage(event.data)
}

// Event listener to handle errors in communication with the server

eventSource.onerror == function () {
    // In case of an error, display the message "Server closed connection" to the user
    updateMessage('Server closed connection')
    // Close the connection to the server
    eventSource.close()
}