// Import the HTTP module to create a server
const http = require("http");

// Import the URL module to handle and parse URLs
const { URL } = require("url");

// Create an HTTP server object
const server = http.createServer((req, res) => {

  // Destructure the 'method' (GET, POST, PUT, DELETE) and 'url' from the incoming request
  const { method, url } = req;
  
  // Parse the URL and create a URL object for easy manipulation
  const parsedUrl = new URL(url, `http://${req.headers.host}`);
  
  // Extract the path from the parsed URL
  const pathname = parsedUrl.pathname;

  // Handle POST requests to the '/todos' path
  if (method === "POST" && pathname === "/todos") {
    let body = "";
    
    // Collect data from the request body (since the body can come in chunks)
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    
    // Once all data is received, log the body to the console
    req.on("end", () => {
      console.log(body);
    });

    // Respond with a 200 status code and a JSON array
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify([1, 2, 3, 4])); // Dummy response data (an array of numbers)
    
  // Handle PUT requests for updating a specific todo (identified by an ID)
  } else if (method === "PUT" && pathname.startsWith("/todos/")) {
    // Extract the todo ID from the URL path (the part after '/todos/')
    const id = parseInt(pathname.split("/")[2]);
    
    // Log the ID of the todo to the console
    console.log(id);
    
    // End the response without sending any content back
    res.end();
    
  // Handle DELETE requests for deleting a specific todo (identified by an ID)
  } else if (method === "DELETE" && pathname.startsWith("/todos/")) {
    // Extract the todo ID from the URL path (the part after '/todos/')
    const id = parseInt(pathname.split("/")[2]);

    // Log the ID and the action (deletion) to the console
    console.log(id, "delete");
    
    // End the response without sending any content back
    res.end();

  // Handle any other requests that don't match the above conditions (invalid paths or methods)
  } else {
    // Respond with a 404 status code and a "page not found" message
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("page not found");
  }
});

// Define the port number where the server will listen for incoming requests
const PORT = 3000;

// Start the server and listen on the specified port (localhost:3000)
server.listen(PORT, "localhost", () => {
  // Log a message indicating the server is running
  console.log(`Server running at http://localhost:${PORT}/`);
});
