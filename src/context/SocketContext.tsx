import React, { useEffect, useState, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: (a: string) => void;
  create_room: (callback: (roomId: string) => void) => void;
}

type SocketContextProps = {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
  //add more values we want to pass as context and type them out
};

export const SocketContext = createContext<SocketContextProps>({
  socket: undefined,
  //add default values
});

type Props = {
  children: React.ReactNode;
};

export const SocketContextProvider: React.FC<Props> = ({ children }) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:8080"
  );
  console.log({ socket });

  return (
    <SocketContext.Provider
      value={{
        socket,
        //pass values we want to provide
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
