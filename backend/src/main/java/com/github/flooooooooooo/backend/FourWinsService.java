package com.github.flooooooooooo.backend;

import org.springframework.stereotype.Service;

@Service
public class FourWinsService {

    private FourWinGame game = new FourWinGame(new int[7][6]);

    public FourWinGame getGame() {
        return game;
    }

    public FourWinGame makeMove(FourWinsTurn turn) {
        int[][] board = game.board();
        int row = board[turn.column()].length - 1;
        while (row >= 0 && board[turn.column()][row] != 0) {
            row--;
        }

        if (row >= 0) {
            board[turn.column()][row] = turn.player();
        }

        return game;
    }

}
