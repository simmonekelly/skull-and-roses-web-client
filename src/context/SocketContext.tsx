import { useEffect, useState, createContext } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";

type Props = {
  children?: any;
};

type ContextProps = {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
};

const SocketContext = createContext<ContextProps>({
  socket: undefined,
});

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: (a: string) => void;
  create_room: () => void;
}

const SocketContextProvider: React.FC<Props> = ({ children }) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:8080"
  );
  console.log({ socket });

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
