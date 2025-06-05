
import { v4 as uuidv4 } from "uuid";
import { Cards, CardType } from "../types/firebaseTypes";

export const createUser = (username: string, controller: boolean) => {
 const currentUser = {
  id: uuidv4(),
  username,
  cards: createCards(),
  matStatus: false,
  gameControler: controller,
  activeTurn: false,
 }

 return currentUser
}

export const createUserWithId = (userId: string, username: string, gameControler: boolean) => {
 const currentUser = {
  id: userId,
  username,
  cards: createCards(),
  matStatus: false,
  gameControler,
  activeTurn: false,
 }

 return currentUser
}

export const createCards = (): Cards => {
 const cards = {
  [uuidv4()]: {type: CardType.Rose, id: ''},
  [uuidv4()]: {type: CardType.Rose, id: ''},
  [uuidv4()]: {type: CardType.Skull, id: ''},
  [uuidv4()]: {type: CardType.Rose, id: ''},
  [uuidv4()]: {type: CardType.Rose, id: ''},
 };

 // Update each card's id to match its key
 Object.entries(cards).forEach(([key, card]) => {
  cards[key] = { ...card, id: key };
 });

 return cards;
}


