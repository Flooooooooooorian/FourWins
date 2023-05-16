package com.github.flooooooooooo.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashSet;
import java.util.Set;

@Service
public class SocketController extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = new HashSet<>();
    private final ObjectMapper objectMapper;
    private final FourWinsService fourWinsService;

    public SocketController(ObjectMapper objectMapper, FourWinsService fourWinsService) {
        this.objectMapper = objectMapper;
        this.fourWinsService = fourWinsService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        sessions.add(session);

        System.out.println(session.getPrincipal().getName() + " Verbindung hergestellt!");
        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(fourWinsService.getGame())));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);

        System.out.println("Nachricht empfangen: " + message.getPayload());

        FourWinsTurn turn = objectMapper.readValue(message.getPayload(), FourWinsTurn.class)
                .withPlayer(Integer.parseInt(session.getPrincipal().getName()));

        if (fourWinsService.isCurrentTurn(turn.player())) {
            fourWinsService.makeMove(turn);
        }

        sendBoard();
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        sessions.remove(session);

        System.out.println("Verbindung abgebrochen!");
    }

    public void sendBoard() {
        sessions.forEach(session -> {
            try {
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(fourWinsService.getGame())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
