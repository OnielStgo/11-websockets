import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

  console.log('Cliente conectado')

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('Olá desde o servidor');

  setInterval(() => {
    console.log('Olá, tudo bem?')
  }, 2000);
});

console.log('Server running on port localhost:3000')