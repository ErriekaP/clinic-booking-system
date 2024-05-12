import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io("http://localhost:3000");
export const WebSocketContext = createContext<Socket>(socket);
export const WebSocketProvider = WebSocketContext.Provider;
