import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

  console.log('Cliente conectado')

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log(`Mensagem do cliente: ${data}`);

    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString().toUpperCase()
    })

    // ws.send(JSON.stringify(payload))

    //enviar mensagem para todos os cliente (inclusive para o emisor)
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }
    // });

    //enviar mensagem para todos os cliente (mas não para o emisor)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado')
  })

});

console.log('Server running on localhost:3000')