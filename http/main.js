// Import the HTTP module
const http = require('http');
const { URL } = require('url');
// Create a server object
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
    const { method, url } = req;
     const parsedUrl = new URL(url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

// http://localhost:3000/todos?name=abhay&add=gwalior
 // Route: GET /todos
  if (method === 'GET' && pathname === '/todos') {
      const data = Object.fromEntries(parsedUrl.searchParams.entries())
      console.log(data)
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([1,2,3,4]));
  }

  // Send the response body as 'Hello, World!'
  res.end();
});

// Define the port to listen on const PORT = 3000;
const PORT = 3000
// Start the server and listen on the specified port
server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});