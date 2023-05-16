package com.github.flooooooooooo.backend;

import lombok.With;

public record FourWinGame(
        int[][] board,
        @With
        int currentPlayer

) {
}
