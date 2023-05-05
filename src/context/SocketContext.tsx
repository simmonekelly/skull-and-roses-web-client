import React, { useEffect, useState, createContext } from "react";
import { Params } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import type { Room } from "../types/Types";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  new_user_joins: (room: Room) => void;
}

interface ClientToServerEvents {
  hello: (a: string) => void;
  create_room: (callback: (room: Room) => void) => void;
  join_room: (
    roomToJoin: string | undefined,
    callback: (room: Room) => void
  ) => void;
}

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
