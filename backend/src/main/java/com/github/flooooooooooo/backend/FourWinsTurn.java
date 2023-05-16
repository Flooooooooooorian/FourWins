package com.github.flooooooooooo.backend;


import lombok.With;

public record FourWinsTurn(
        int column,
        @With
        int player
) {
}
