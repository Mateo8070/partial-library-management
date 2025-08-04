# MongoDB Code Notes

This file contains all the code related to the MongoDB integration in the project.

## 1. `application.properties`

The MongoDB connection string.

```properties
spring.data.mongodb.uri=mongodb+srv://mateo807:matean2002.@cluster0.ti4stv6.mongodb.net/librarians?retryWrites=true&w=majority&appName=Cluster0
```

## 2. `Librarian.java` (Model)

The data model for a librarian, stored in the `librarians` collection.

```java
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
```

## 3. `LibrarianRepository.java` (Repository)

The Spring Data repository interface for `Librarian` objects.

```java
package com.matthew.bookdb.mongo.repository;

import com.matthew.bookdb.mongo.model.Librarian;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LibrarianRepository extends MongoRepository<Librarian, String> {
  //custom queries here
}
```

## 4. `LibrarianController.java` (Controller)

The REST controller for handling librarian-related API requests.

```java
package com.matthew.bookdb.mongo.controller;

import com.matthew.bookdb.mongo.model.Librarian;
import com.matthew.bookdb.mongo.repository.LibrarianRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/librarians")
public class LibrarianController {

    LibrarianRepository librarianRepository;

    public LibrarianController(LibrarianRepository librarianRepository) {
        this.librarianRepository = librarianRepository;
    }

    @GetMapping
    public List<Librarian> getAllLibrarians(){
        return librarianRepository.findAll();
    }

    @PostMapping
    public String createLibrarian(@RequestBody Librarian librarian){
        return librarianRepository.save(librarian).getName();
    }
}
```

## 5. `MongoConfigInterface.java` (Configuration)

An interface for MongoDB configuration.

```java
package com.matthew.bookdb.mongo.config;

import com.mongodb.client.MongoClient;
import org.springframework.context.annotation.Bean;

public interface MongoConfigInterface {
    @Bean
    MongoClient mongoClient();
}
```

## 6. `MongoConfig.java` (Configuration)

An empty configuration file. As it is empty, it has no effect on the application.

```java
// This file is empty.
public void getMe(){
    
}
```
