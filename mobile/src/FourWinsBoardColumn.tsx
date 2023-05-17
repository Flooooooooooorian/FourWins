import { Game } from "./models";
import { Pressable, Text, View } from "react-native";
import React from "react";

type FourWinsBoardColumnProps = {
  game: Game,
  onPress: () => void,
  isTurn: boolean,
  column: number
}

export default function FourWinsBoardColumn({ game, onPress, isTurn, column }: FourWinsBoardColumnProps) {

  return (
    <View style={{
      width: 50,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end"
    }}>
      {isTurn && game.board[column][0] === 0 && <Pressable onPress={onPress} style={{
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 50,
        height: 50
      }}>
        <Text style={{ textAlign: "center" }}>
          |
        </Text>
        <Text style={{ textAlign: "center" }}>
          v
        </Text>
      </Pressable>
      }

      {
        game.board[column].map((cell, row) => {
            console.log("column: " + column, "row: " + row);
            console.log(game.winningCells);
            console.log(game.winningCells?.includes({ column: column, row: row }));

            return <Text
              key={row}
              style={{
                textAlign: "center", borderStyle: "solid",
                borderColor: game.winningCells?.some((element) => (element.column === column && element.row === row)) ? "green" : "black",
                borderWidth: 1
              }}>
              {cell}
            </Text>;
          }
        )}
    </View>
  );
}
