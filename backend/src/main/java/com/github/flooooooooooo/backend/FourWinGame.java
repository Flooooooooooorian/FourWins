package com.github.flooooooooooo.backend;

import lombok.With;

import java.util.List;
import java.util.Map;

public record FourWinGame(
        int[][] board,
        @With
        int currentPlayer,
        @With
        int winner,
        @With
        List<Cell<Integer, Integer>> winningCells

) {
}
