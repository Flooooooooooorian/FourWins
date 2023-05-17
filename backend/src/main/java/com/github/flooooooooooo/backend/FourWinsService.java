package com.github.flooooooooooo.backend;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FourWinsService {

    private FourWinGame game = new FourWinGame(new int[7][6], 1, 0, null);

    public FourWinGame getGame() {
        return game;
    }

    public boolean isCurrentTurn(int player) {
        return game.currentPlayer() == player;
    }

    public FourWinGame makeMove(FourWinsTurn turn) {
        int[][] board = game.board();
        int row = board[turn.column()].length - 1;
        while (row >= 0 && board[turn.column()][row] != 0) {
            row--;
        }

        if (row >= 0) {
            board[turn.column()][row] = turn.player();

            if (checkWin()) {
                game = game.withWinner(turn.player());
            }

            game = game.withCurrentPlayer(turn.player() == 1 ? 2 : 1);
        }


        return game;
    }

    private boolean checkWin() {
        int[][] board = game.board();
        int player = game.currentPlayer();

        // Vertical
        for (int i = 0; i < board.length; i++) {
            int[] column = board[i];

            int inAColumn = 0;
            for (int j = 0; j < column.length; j++) {
                int cell = column[j];
                if (cell == player) {
                    inAColumn++;
                } else {
                    inAColumn = 0;
                }

                if (inAColumn == 4) {
                    game = game.withWinningCells(List.of(new Cell<>(i, j),
                            new Cell<>(i, j - 1),
                            new Cell<>(i, j - 2),
                            new Cell<>(i, j - 3)));
                    return true;
                }
            }
        }

        //Horizontal
        for (int i = 0; i < board[i].length; i++) {
            int inARow = 0;
            for (int j = 0; j < board.length; j++) {
                if (board[j][i] == player) {
                    inARow++;
                } else {
                    inARow = 0;
                }

                if (inARow == 4) {
                    game = game.withWinningCells(List.of(new Cell<>(j, i),
                            new Cell<>(j - 1, i),
                            new Cell<>(j - 2, i),
                            new Cell<>(j - 3, i)));
                    return true;
                }
            }
        }

        //Diagonal
        int rows = board.length;
        int cols = board[0].length;

        // Überprüfung der Hauptdiagonale
        for (int i = 0; i <= rows - 4; i++) {
            for (int j = 0; j <= cols - 4; j++) {
                if (board[i][j] == player && board[i][j] == board[i+1][j+1] && board[i][j] == board[i+2][j+2] && board[i][j] == board[i+3][j+3]) {
                    game = game.withWinningCells(List.of(new Cell<>(i, j),
                            new Cell<>(i +1, j +1),
                            new Cell<>(i +2, j +2),
                            new Cell<>(i +3, j +3)));
                    return true;
                }
            }
        }

        // Überprüfung der Nebendiagonale
        for (int i = 0; i <= rows - 4; i++) {
            for (int j = cols - 1; j >= 3; j--) {
                if (board[i][j] == player && board[i][j] == board[i+1][j-1] && board[i][j] == board[i+2][j-2] && board[i][j] == board[i+3][j-3]) {
                    game = game.withWinningCells(List.of(new Cell<>(i, j),
                            new Cell<>(i +1, j - 1),
                            new Cell<>(i +2, j - 2),
                            new Cell<>(i +3, j - 3)));
                    return true;
                }
            }
        }

        return false;
    }
}
