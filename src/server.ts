import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
// import path from "node:path";
// const port = (process.argv.length > 2) ? process.argv[2] : 12345;
const port = process.env.PORT || 12345;
const server = http.createServer();

server.on("request", async (req, res) => {
  console.log("request url: ", req.url);
  // Content-Type is important for browsers.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  // res.writeHead(200, { "content-type": "text/plain" });
  // res.write("hello!\n");
  // res.end();

  if (req.url === undefined) {
    res.end();
    return;
  }

  const filePath = path.join(path.resolve(), "public", req.url);
  // const extname = String(path.extname(filePath)).toLowerCase();
  // const mimeTypes = {
  //     '.html': 'text/html',
  //     '.js': 'text/javascript',
  //     '.css': 'text/css',
  //     '.json': 'application/json',
  //     '.png': 'image/png',
  //     '.jpg': 'image/jpg',
  //     '.gif': 'image/gif',
  //     '.svg': 'image/svg+xml',
  //     '.wav': 'audio/wav',
  //     '.mp4': 'video/mp4',
  //     '.woff': 'application/font-woff',
  //     '.ttf': 'application/font-ttf',
  //     '.eot': 'application/vnd.ms-fontobject',
  //     '.otf': 'application/font-otf',
  //     '.wasm': 'application/wasm'
  // };
  // const contentType = mimeTypes[extname] || 'application/octet-stream';

  try {
    const file = await fs.readFile(filePath);
    if (filePath.endsWith("html")) {
      res.writeHead(200, { "content-type": "text/html" });
    } else if (filePath.endsWith("jpg")) {
      res.writeHead(200, { "content-type": "image/jpeg" });
    } else if (filePath.endsWith("json")) {
      res.writeHead(200, { "content-type": "text/json" });
    } else if (filePath.endsWith("ico")) {
      res.writeHead(200, { "content-type": "image/x-icon" });
    }
    res.end(file);
  } catch (err) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end();
  }
});

server.on("listening", () => {
  console.log("start listening!");
});

// Start listening 12345 port of localhost (127.0.0.1).
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
console.log("run server.js");
