import React, { useEffect, useState, createContext } from "react";
import { useNavigate, useLocation, Params } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import type { Room } from "../types/Types";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: (a: string) => void;
  create_room: (callback: (room: Room) => void) => void;
  join_room: (params: Params, callback: (room: Room) => void) => void;
}

type SocketContextProps = {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
  setRoomId: (roomId: string) => void;
  roomId: string | undefined;
};

export const SocketContext = createContext<SocketContextProps>({
  socket: undefined,
  setRoomId: () => {},
  roomId: undefined,
});

type Props = {
  children: React.ReactNode;
};

export const SocketContextProvider: React.FC<Props> = ({ children }) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:8080"
  );

  const [roomId, setRoomId] = useState<string>();

  useEffect(() => {}, []);
  console.log({ socket, roomId });

  return (
    <SocketContext.Provider
      value={{
        socket,
        setRoomId,
        roomId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
