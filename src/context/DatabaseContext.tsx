// src/components/MyDataComponent.js (Example)

import React, { createContext, useEffect, useState } from "react";
import { database } from "../index"; // <-- Import your database reference
import { ref, onValue, update, DatabaseReference } from "firebase/database"; // <-- Import RTDB methods
import { Card, Room, User } from "../types/firebaseTypes";

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
};

export const DatabaseContext = createContext<DatabaseContextValue>(
  {} as DatabaseContextValue
);

export const DatabaseContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
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
      await update(currentRoomRef, {
        players: delete roomData.players[user.id],
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
    delete currentUser.cards[submittedCard.id];
    console.log({ currentUser });

    console.log({
      roomData,
      submittedCard,
    });

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

  return (
    <DatabaseContext.Provider
      value={{ database, addUserToRoom, removeUserFromRoom, submitCard }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
