import { ReactElement, useEffect, useState } from "react";
import { Text, View } from "react-native";

function FourWins(): ReactElement {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const onOpen = () => {
    console.log("open");
  };

  const onClose = () => {
    console.log("close");
  };

  const onMessage = (event: WebSocketMessageEvent) => {
    console.log(event.data);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.1.132");
    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onmessage = onMessage;
    setWs(ws);
  }, []);

  return (
    <View>
      <Text>FourWins</Text>
    </View>
  );
}

export default FourWins;
