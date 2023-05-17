package com.github.flooooooooooo.backend;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class FourWinsRepository {

    private List<FourWinGame> games = new ArrayList<>();

//    public FourWinGame findById(String id) {
//        return games.stream()
//                .filter(game -> game.id().equals(id))
//                .findFirst()
//                .orElseThrow();
//    }
}
