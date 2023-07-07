import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type {
  NextApiResponseWithSocket,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../types/IndexContentForm";

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {

    const io = new Server<ClientToServerEvents, ServerToClientEvents>(
        res.socket.server
      );

    io.on("connection", (socket) => {

      socket.on("hello", (msg) => {
        socket.emit("hello", msg);
      });
      
      socket.on("disconnect", () => {
        console.log("A user disconnected");
        socket.broadcast.emit("userServerDisconnection", socket.id);
      });
    });

    res.socket.server.io = io;
    io.emit('hello', 'hello')
  
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;