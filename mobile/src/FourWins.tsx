import { ReactElement, useEffect, useState } from "react";
import { Text, View } from "react-native";
import FourWinsBoard from "./FourWinsBoard";
import { Game } from "./models";

function FourWins(): ReactElement {
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

  useEffect(() => {
    const websocketConfig = { headers: { "Authorization": "Basic MTpUZXN0MQ==" } };
    const ws = new WebSocket("ws://192.168.1.132:8080/ws/app", null, websocketConfig);
    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onmessage = onMessage;
    setWs(ws);
  }, []);


  const onPlay = (column: number) => {
    if (ws) {
      ws.send(JSON.stringify({ column }));
    }
  };

  return (
    <View>
      <Text>FourWins</Text>
      {game && <FourWinsBoard game={game} onPlay={onPlay} />}
    </View>
  );
}

export default FourWins;
