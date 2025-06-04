import React, { useContext } from "react";
import { Room, User } from "../types/firebaseTypes";
import { Modal } from "./Modal";
import { DatabaseReference } from "firebase/database";
import { Paragraph } from "../styles/styles";
import { DatabaseContext } from "../context/DatabaseContext";

type Props = {
  currentUser: User;
  currentRoomRef: DatabaseReference;
  roomData: Room;
  isThereAGuess: boolean;
};

export const GuessResultModal: React.FC<Props> = ({
  currentUser,
  currentRoomRef,
  roomData,
  isThereAGuess,
}) => {
  const { resetGame } = useContext(DatabaseContext);
  const isGameMaster = Boolean(
    currentUser.gameControler && roomData.players[currentUser.id]
  );
  const userWhoGuessed = Object.values(roomData.players).find(
    (player) => player.guessedCorrectly
  );

  const result = userWhoGuessed?.guessedCorrectly ? "lost" : "won";

  const content = (
    <>
      <Paragraph>
        Congrats {userWhoGuessed?.username} {result}!
      </Paragraph>
      <Paragraph>Wait for game master to start new game</Paragraph>
    </>
  );

  const gameMasterContent = (
    <>
      <Paragraph>
        Congrats {userWhoGuessed?.username} {result}!
      </Paragraph>
      <Paragraph>Click 'Next Round' to start new game</Paragraph>
    </>
  );

  return isGameMaster ? (
    <Modal
      open={isThereAGuess}
      handleClose={() => {}}
      title="Guess Result"
      content={gameMasterContent}
      buttonText="Next Round"
      onSubmit={() => {
        resetGame(currentRoomRef);
      }}
    />
  ) : (
    <Modal
      open={isThereAGuess}
      disableEscapeKeyDown={true}
      handleClose={() => {}}
      title="Guess Result"
      content={content}
    />
  );
};
