import http from "http";
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200);
    res.end("Welcome Home!");
  } else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200);
    res.end("About Page");
  } else {
    res.WriteHead(404);
    res.end("404 not found");
  }

});
  server.listen(3000, () => {
    console.log("Server running On 3000");
  });
