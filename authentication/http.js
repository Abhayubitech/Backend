// Import the HTTP module
const http = require("http");
const { addUser, authenticateUser } = require("./fs");
const { URL } = require("url");

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const parsedUrl = new URL(url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  if (method === "POST" && pathname === "/singin") {
   let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      try {
        const response = authenticateUser(data);
        res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
      } catch {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({msg:"internal server error",status:false}))
      }

    });
  } else if (method === "POST" && pathname === "/singup") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      try {
        const response = addUser(data);
        res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
      } catch(err) {
        console.log(err)
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({msg:"internal server error",status:false}))
      }

    });
  }
});

const PORT = 3000;

server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
