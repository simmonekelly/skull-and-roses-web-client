import { DatabaseReference } from "firebase/database";

export type User = {
  id: string;
  cards: string[];
  matStatus: boolean;
  gameControler: boolean;
  username: string;
};

export type CurrentUser = User;

export type Room = {
  createdAt: Date;
  name: string;
  players: User[];
  stockPile?: string[];
};

export type UpdateRoomProps = {
  currentUser: User;
  currentRoomRef: DatabaseReference;
  roomData: Room;
};
