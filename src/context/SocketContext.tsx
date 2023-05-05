import React, { useEffect, useState, createContext } from "react";
import { Params } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import type {
  Room,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../types/Types";

type SocketContextProps = {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
  setRoom: (room: Room) => void;
  room: Room | undefined;
};

export const SocketContext = createContext<SocketContextProps>({
  socket: undefined,
  setRoom: () => {},
  room: undefined,
});

type Props = {
  children: React.ReactNode;
};

export const SocketContextProvider: React.FC<Props> = ({ children }) => {
  const [room, setRoom] = useState<Room>();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:8080"
    );
    setSocket(socket);
  }, []);
  //console.log({ socket, room });

  return (
    <SocketContext.Provider
      value={{
        socket,
        setRoom,
        room,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
