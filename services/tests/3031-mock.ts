const server = Bun.serve({
  port: 3031,
  fetch(request) {
    return new Response("Welcome to Mock Bun 3031!");
  },
});

console.log(`Listening on localhost: ${server.port}`);
