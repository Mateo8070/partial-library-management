package com.matthew.bookdb.mongo.repository;

import com.matthew.bookdb.mongo.model.Librarian;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface LibrarianRepository extends MongoRepository<Librarian, String> {
    List<Librarian> findByNameIgnoreCase(String name);
    List<Librarian> findByDepartmentContainingIgnoreCase(String dept);
}
