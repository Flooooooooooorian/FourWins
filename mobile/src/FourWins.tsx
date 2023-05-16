import { ReactElement, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import FourWinsBoard from "./FourWinsBoard";
import { Game } from "./models";
import Buffer from "buffer";

function FourWins(): ReactElement {
  const [user, setUser] = useState({ username: 1, password: "Test1" });
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [game, setGame] = useState<Game | null>(null);

  const onOpen = () => {
    console.log("open");
  };

  const onClose = () => {
    console.log("close");
  };

  const onMessage = (event: WebSocketMessageEvent) => {
    console.log(event.data);
    setGame(JSON.parse(event.data));
  };

  const establishWebsocketConnection = () => {
    let encodedCredentials = new Buffer.Buffer(user.username + ":" + user.password).toString("base64");
    const websocketConfig = { headers: { "Authorization": "Basic " + encodedCredentials } };
    const ws = new WebSocket("ws://192.168.1.132:8080/ws/app", null, websocketConfig);
    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onmessage = onMessage;
    setWs(ws);
  };

  const onPlay = (column: number) => {
    if (ws) {
      ws.send(JSON.stringify({ column }));
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 20 }}>FourWins</Text>
      <TextInput value={String(user.username)}
                 placeholder="Username"
                 onChangeText={(text) => setUser(prevState => ({ ...prevState, username: Number(text) }))} />
      <TextInput value={user.password}
                 placeholder="Passwort"
                 onChangeText={(text) => setUser(prevState => ({ ...prevState, password: text }))} />
      <Button title="Login" onPress={() => {
        establishWebsocketConnection();
      }} />

      {game && <FourWinsBoard game={game} onPlay={onPlay} isTurn={game.currentPlayer === user.username} />}
    </View>
  );
}

export default FourWins;
