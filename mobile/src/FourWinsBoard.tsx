import React from "react";
import { Game } from "./models";
import { Pressable, Text, View } from "react-native";

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
      {game.board.map((row, column) => <FourWinsBoardColumn row={row} isTurn={isTurn} key={column} onPress={() => onPlay(column)} />
      )}
    </View>
  );
}

function FourWinsBoardColumn({ row, onPress, isTurn }: { row: number[], onPress: () => void, isTurn: boolean }) {

  return (
    <View style={{
      width: 50,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    }}>
      {isTurn && row[0] === 0 && <Pressable onPress={onPress} style={{
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
        row.map((cell, index) => (
            <Text
              key={index}
              style={{
                textAlign: "center", borderStyle: "solid",
                borderColor: "blue",
                borderWidth: 1
              }}>
              {cell}
            </Text>
          )
        )}
    </View>
  );
}
