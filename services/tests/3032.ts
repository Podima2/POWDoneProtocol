const server = Bun.serve({
  port: 3032,
  fetch(request) {
    return new Response("Welcome to Mock Bun 3032!");
  },
});

console.log(`Listening on localhost: ${server.port}`);
