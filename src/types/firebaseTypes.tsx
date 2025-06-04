import { DatabaseReference } from "firebase/database";

export type User = {
  id: string;
  cards: Cards;
  matStatus: boolean;
  gameControler: boolean;
  username: string;
  activeTurn: boolean;
  guessedCorrectly?: boolean;
};

export enum CardType {
  Rose = "rose",
  Skull = "skull",
}

export type Card = {
  id: string;
  type: CardType;
};

export type Cards = Record<string, Card>;

export type CurrentUser = User;

export type Room = {
  createdAt: Date;
  name: string;
  players: Players;
  stockPile: Cards | null;
  hasGameStarted: boolean;
};

type Players = Record<string, User>;

export type UpdateRoomProps = CurrentRoom & {
  currentUser: User;
};

export type CurrentRoom = {
  currentRoomRef: DatabaseReference;
  roomData: Room;
  currentUser: User;
};

export type SubmittedCardData = {
  cardText: string;
  cardIndex: number;
};
