
import { v4 as uuidv4 } from "uuid";

export const createUser = (username: string, controller: boolean) => {
 const currentUser = {
  id: uuidv4(),
  username,
  cards: ["rose", "rose", "skull", "rose", "rose"],
  matStatus: false,
  gameControler: controller,
 }

 return currentUser
}

