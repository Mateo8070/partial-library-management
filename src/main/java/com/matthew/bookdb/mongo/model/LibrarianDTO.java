package com.matthew.bookdb.mongo.model;

public class LibrarianDTO {
    private final String name;
    private final String email;
    private final String department;


    public LibrarianDTO(String name, String email, String department) {
        this.name = name;
        this.email = email;
        this.department = department;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }
}
