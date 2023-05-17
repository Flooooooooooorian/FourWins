package com.github.flooooooooooo.backend;

public class Cell<A, B> {
    private A column;
    private B row;

    public Cell(A column, B row) {
        this.column = column;
        this.row = row;
    }

    public A getColumn() {
        return column;
    }

    public void setColumn(A column) {
        this.column = column;
    }

    public B getRow() {
        return row;
    }

    public void setRow(B row) {
        this.row = row;
    }
}
