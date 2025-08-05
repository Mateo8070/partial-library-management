package com.matthew.bookdb.dtos;

import java.util.List;

public class ResponseDTO {
    String status;
    List<LibrarianDTO> data;
    int count;

    public ResponseDTO(int count, List<LibrarianDTO> data, String status) {
        this.count = count;
        this.data= data;
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public List<LibrarianDTO> getData() {
        return data;
    }

    public int getCount() {
        return count;
    }
}
