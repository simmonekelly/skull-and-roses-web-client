export type User = {
  id: string;
  cards: string[];
  matStatus: boolean;
  gameControler: boolean;
};

export type CurrentUser = User;

export type Room = {
  roomId: string;
  players: User[];
  stockPile: string[];
};

export type NewRoom = {
  room: Room;
  currentUser: CurrentUser;
};

export type SubmittedCardData = {
  cardText: string;
  cardIndex: number;
};

export type JoinRoom = NewRoom;

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  new_user_joins: (room: Room) => void;
  update_room: (room: Room) => void;
  show_guess_result_modal: (
    room: Room,
    userId: string,
    userGuess: number
  ) => void;
}

export interface ClientToServerEvents {
  hello: (a: string) => void;
  create_room: (callback: (newRoom: NewRoom) => void) => void;
  join_room: (
    roomToJoin: string | undefined,
    callback: (joinRoom: JoinRoom) => void
  ) => void;
  submit_card: (
    currentRoom: string,
    currentUser: string,
    cardData: SubmittedCardData,
    callback: (currentUser: User) => void
  ) => void;
  submit_guess: (
    currentRoom: string,
    currentUser: string,
    userGuess: number,
    callback: () => void
  ) => void;
  update_mat_status: (
    currentRoomId: string,
    guessingUserId: string,
    currentUserId: string,
    updatedMatStatus: boolean,
    callback: (updatedUser: User) => void
  ) => void;
  reset_for_next_round: (
    currentRoomId: string,
    currentUserId: string,
    callback: (updatedUser: User) => void
  ) => void;
}
