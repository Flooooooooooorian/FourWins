import React from "react";
import { Game } from "./models";
import { Pressable, Text, View } from "react-native";
import FourWinsBoardColumn from "./FourWinsBoardColumn";

type GameProps = {
  game: Game;
  onPlay: (column: number) => void;
  isTurn: boolean;
}
export default function FourWinsBoard({ game, onPlay, isTurn }: GameProps) {

  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      borderStyle: "solid",
      borderColor: "blue",
      borderWidth: 1
    }}>
      {
        game.board.map((row, column) => (
            <FourWinsBoardColumn game={game} isTurn={isTurn} key={column} column={column} onPress={() => onPlay(column)} />
          )
        )
      }
    </View>
  );
}
