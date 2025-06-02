// src/components/MyDataComponent.js (Example)

import React, { createContext, useEffect, useState } from "react";
import { database } from "../index"; // <-- Import your database reference
import {
  ref,
  onValue,
  set,
  update,
  DatabaseReference,
} from "firebase/database"; // <-- Import RTDB methods
import { Room, User } from "../types/firebaseTypes";

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
  // const roomsRef = ref(database, "/rooms");

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

  const updateRoom = async () => {
    // const room = roomsRef use roomName to find
  };

  const addUserToRoom = async (
    user: User,
    currentRoomRef: DatabaseReference,
    roomData: Room
  ) => {
    try {
      await update(currentRoomRef, {
        players: [...roomData.players, user],
      });
      console.log("room updated");
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
        players: roomData.players.filter((player) => player.id !== user.id),
      });
      console.log("room updated");
    } catch (error) {
      console.error("Error removing user from room: ", error);
    }
  };

  return (
    <DatabaseContext.Provider
      value={{ database, addUserToRoom, removeUserFromRoom }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
