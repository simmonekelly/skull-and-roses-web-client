import React, {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { io, Socket } from "socket.io-client";
import type {
  Room,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../types/Types";

type SocketContextValue = {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
  setRoom: (room: Room) => void;
  room: Room | undefined;
  currentUser: any;
  otherUsers: any;
  setCurrentUser: Dispatch<SetStateAction<string | undefined>>;
  setOtherUsers: Dispatch<SetStateAction<undefined>>;
};

export const SocketContext = createContext<SocketContextValue>({
  socket: undefined,
  setRoom: () => {},
  room: undefined,
  currentUser: undefined,
  otherUsers: undefined,
  setCurrentUser: () => {},
  setOtherUsers: () => {},
});

export const SocketContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [room, setRoom] = useState<Room>();
  const [socket, setSocket] = useState<Socket>();
  const [currentUser, setCurrentUser] = useState<string>();
  const [otherUsers, setOtherUsers] = useState();

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
        currentUser,
        otherUsers,
        setCurrentUser,
        setOtherUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
