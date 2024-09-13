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
  setRoom: Dispatch<SetStateAction<Room>>;
  room: Room;
  currentUser: CurrentUser;
  otherUsers: User[];
  setCurrentUser: Dispatch<SetStateAction<CurrentUser>>;
  setOtherUsers: Dispatch<SetStateAction<User[]>>;
};

export const SocketContext = createContext<SocketContextValue>(
  {} as SocketContextValue
);

export const SocketContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [room, setRoom] = useState<Room>({} as Room);
  const [socket, setSocket] = useState<Socket>();
  const [currentUser, setCurrentUser] = useState<CurrentUser>(
    {} as CurrentUser
  );
  const [otherUsers, setOtherUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!socket) {
      const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
        "https://skull-and-roses-game-server.onrender.com/"
      );
      setSocket(socket);
    }
  }, [socket]);
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
