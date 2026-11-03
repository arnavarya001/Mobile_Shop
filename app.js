// Local development entry point. Netlify serves the same handler as a Function.
const express = require("express");

async function start() {
  const { default: handler } = await import("./netlify/functions/store.mts");
  const app = express();
  app.use(express.static("public"));
  app.use(express.raw({ type: () => true }));
  app.use(async (req, res) => {
    const method = req.method;
    const request = new Request(`http://localhost:3000${req.originalUrl}`, {
      method,
      headers: req.headers,
      ...(method !== "GET" && method !== "HEAD" ? { body: req.body } : {}),
    });
    const response = await handler(request);
    res.status(response.status);
    response.headers.forEach((value, name) => res.setHeader(name, value));
    res.send(Buffer.from(await response.arrayBuffer()));
  });
  app.listen(3000, () => console.log("Mobile Store listening on port 3000"));
}

start();
