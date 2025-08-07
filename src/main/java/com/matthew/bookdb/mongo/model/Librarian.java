package com.matthew.bookdb.mongo.model;
import jakarta.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "librarians")
public class Librarian {
    @Id
    String id;
    String name;
    String email;
    String department;

    public String getName () {
        return name;
    }

    public void setName (String name) {
        this.name = name;
    }

    public String getEmail () {
        return email;
    }

    public void setEmail (String email) {
        this.email = email;
    }

    public String getDepartment () {
        return department;
    }

    public void setDepartment (String department) {
        this.department = department;
    }
}
