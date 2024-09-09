export type Room = {
  roomId: string;
  players: [];
};

export type NewRoom = {
  room: Room;
  currentUser: string;
};

export type JoinRoom = NewRoom;

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  new_user_joins: (room: Room) => void;
}

export interface ClientToServerEvents {
  hello: (a: string) => void;
  create_room: (callback: (newRoom: NewRoom) => void) => void;
  // create_room: (callback: (room: Room) => void) => void;
  // join_room: (
  //   roomToJoin: string | undefined,
  //   callback: (room: Room) => void
  // ) => void;
  join_room: (
    roomToJoin: string | undefined,
    callback: (joinRoom: JoinRoom) => void
  ) => void;
}
