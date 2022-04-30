import { Server } from 'https://raw.githubusercontent.com/littlemods/http-server/master/mod.ts';

const server = new Server();

server.static('/public/', './');

const main = server.on('/');
main(({ respond }) => {
  fetch(`file://${ Deno.cwd( ) }/main.html`)
    .then(async (data) => respond({ body: await data.arrayBuffer(), headers: { 'content-type': 'text/html' } }))
    .catch(() => respond({ body: '<h1>Error</h1>', status: 404, headers: { 'content-type': 'text/html' } }));
});

server.listen();