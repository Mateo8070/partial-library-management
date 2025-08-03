package com.matthew.bookdb.repository;

import com.matthew.bookdb.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
