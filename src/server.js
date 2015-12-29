import Server from 'socket.io';

export default function startServer() {
  // creates Socket server & regular HTTP Server bound to port 8090
  // port arbitrary but must match port used later to connect from clients
  const io = new Server().attach(8090);
}