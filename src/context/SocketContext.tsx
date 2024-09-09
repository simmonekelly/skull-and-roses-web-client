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
  CurrentUser,
  User,
} from "../types/Types";

type SocketContextValue = {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
  setRoom: Dispatch<SetStateAction<Room | undefined>>;
  // (room: Room) => void;
  room?: Room;
  currentUser?: CurrentUser;
  otherUsers?: User[];
  setCurrentUser: Dispatch<SetStateAction<CurrentUser | undefined>>;
  setOtherUsers: Dispatch<SetStateAction<User[] | undefined>>;
};

export const SocketContext = createContext<SocketContextValue>(
  {} as SocketContextValue
);

export const SocketContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [room, setRoom] = useState<Room>();
  const [socket, setSocket] = useState<Socket>();
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [otherUsers, setOtherUsers] = useState<User[]>();

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
