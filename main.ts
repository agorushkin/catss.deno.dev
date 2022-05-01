import { Server } from 'https://raw.githubusercontent.com/littlemods/http-server/master/mod.ts';

const server = new Server();

server.static('/public/', './');

const main = server.on('/{gif}?');
main(({ respond }) => {
  fetch(`file://${ Deno.cwd( ) }/main.html`)
    .then(async (data) => respond({ body: await data.arrayBuffer(), headers: { 'content-type': 'text/html' } }))
    .catch(() => respond({ body: '<h1>Error</h1>', status: 404, headers: { 'content-type': 'text/html' } }));
});

const get = server.on('/get/:name');
get(async ({ respond, params: { name } }) => {
  const request = await fetch(`https://cdn2.thecatapi.com/images/${ name }`);
  const blob    = await request.blob();
  const uint    = new Uint8Array(await blob.arrayBuffer());
  
  const contentType = request.headers.get('content-type')!;

  respond({ body: uint, headers: { 'content-type': contentType } });
});

server.listen();