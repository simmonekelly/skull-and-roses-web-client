import React, { createContext, useEffect, useState } from "react";
import { database } from "../index"; // <-- Import your database reference
import {
  ref,
  onValue,
  update,
  DatabaseReference,
  get,
} from "firebase/database"; // <-- Import RTDB methods
import { Card, Room, User } from "../types/firebaseTypes";
import { createCards } from "../utils/createAUser";

type DatabaseContextValue = {
  database: any;
  addUserToRoom: (
    user: User,
    currentRoomRef: DatabaseReference,
    roomData: Room
  ) => Promise<void>;
  removeUserFromRoom: (
    user: User,
    currentRoomRef: DatabaseReference,
    roomData: Room
  ) => Promise<void>;
  submitCard: (
    user: User,
    currentRoomRef: DatabaseReference,
    roomData: Room,
    submittedCard: Card
  ) => Promise<void>;
  updateGameStatus: (
    status: boolean,
    currentRoomRef: DatabaseReference
  ) => Promise<void>;
  resetGame: (currentRoomRef: DatabaseReference) => Promise<void>;
};

export const DatabaseContext = createContext<DatabaseContextValue>(
  {} as DatabaseContextValue
);

export const DatabaseContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // eslint-disable-next-line
  const [data, setData] = useState(null);
  //^^ to view current data
  //vv to create data reference to update

  const dataRef = ref(database, "/"); // <-- Create a reference to a specific location

  useEffect(() => {
    // Example: Read data
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const value = snapshot.val();
      console.log("Current data:", value);
      setData(value);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []); // Empty dependency array means this runs once on mount

  const addUserToRoom = async (
    user: User,
    currentRoomRef: DatabaseReference,
    roomData: Room
  ) => {
    try {
      await update(currentRoomRef, {
        players: {
          ...roomData.players,
          [user.id]: user,
        },
      });
      console.log("user added to room");
    } catch (error) {
      console.error("Error adding user to room: ", error);
    }
  };

  const removeUserFromRoom = async (
    user: User,
    currentRoomRef: DatabaseReference,
    roomData: Room
  ) => {
    try {
      delete roomData.players[user.id];
      await update(currentRoomRef, {
        players: { ...roomData.players },
      });
      console.log("user removed from room");
    } catch (error) {
      console.error("Error removing user from room: ", error);
    }
  };

  const submitCard = async (
    user: User,
    currentRoomRef: DatabaseReference,
    roomData: Room,
    submittedCard: Card
  ) => {
    const currentUser = roomData.players[user.id];
    const currentUserIndex = Object.values(roomData.players).indexOf(
      currentUser
    );
    delete currentUser.cards[submittedCard.id];
    currentUser.activeTurn = false;

    const nextUserIndex =
      currentUserIndex === Object.values(roomData.players).length - 1
        ? 0
        : currentUserIndex + 1;

    const nextPlayer = Object.values(roomData.players)[nextUserIndex] as User;
    nextPlayer.activeTurn = true;

    try {
      await update(currentRoomRef, {
        players: {
          ...roomData.players,
          [user.id]: currentUser,
        },
        stockPile: {
          ...roomData.stockPile,
          [submittedCard.id]: submittedCard,
        },
      });
      console.log("card submitted");
    } catch (error) {
      console.error("Error submitting card: ", error);
    }
  };

  const updateGameStatus = async (
    status: boolean,
    currentRoomRef: DatabaseReference
  ) => {
    const roomData = await get(currentRoomRef);

    const firstPlayer = Object.values(roomData.val().players)[0] as User;
    firstPlayer.activeTurn = true;

    try {
      await update(currentRoomRef, {
        ...roomData.val(),
        players: {
          ...roomData.val().players,
          [firstPlayer.id]: firstPlayer,
        },
        hasGameStarted: status,
      });
      console.log("game status updated");
    } catch (error) {
      console.error("Error updating game status: ", error);
    }
  };

  const resetGame = async (currentRoomRef: DatabaseReference) => {
    const roomData = (await get(currentRoomRef).then((snapshot) =>
      snapshot.val()
    )) as Room;

    const updatedPlayers = Object.values(roomData.players).map(
      (player: User) => {
        player.activeTurn = false;
        player.cards = createCards();
        delete player.guessedCorrectly;
        return player;
      }
    );

    const firstPlayer = updatedPlayers[0];
    firstPlayer.activeTurn = true;

    try {
      await update(currentRoomRef, {
        ...roomData,
        players: {
          ...roomData.players,
          [firstPlayer.id]: firstPlayer,
        },
        hasGameStarted: false,
        stockPile: null,
      });
      console.log("game reset");
    } catch (error) {
      console.error("Error resetting game: ", error);
    }
  };

  return (
    <DatabaseContext.Provider
      value={{
        database,
        addUserToRoom,
        removeUserFromRoom,
        submitCard,
        updateGameStatus,
        resetGame,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
