const server = Bun.serve({
  port: 3030,
  fetch(request) {
    return new Response("Welcome to Mock Bun 3030!");
  },
});

console.log(`Listening on localhost: ${server.port}`);
