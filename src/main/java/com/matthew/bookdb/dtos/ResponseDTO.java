package com.matthew.bookdb.dtos;

import java.util.List;

public class ResponseDTO {
    String status;
    List<LibrarianDTO> data;
    int count;


    public ResponseDTO (String status, List<LibrarianDTO> data, int count) {
        this.status = status;
        this.data = data;
        this.count = count;
    }
}
