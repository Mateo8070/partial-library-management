# MySQL Code Notes

This file contains all the code related to the MySQL integration in the project.

## 1. `application.properties`

The MySQL connection and JPA configuration.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bookdb
spring.datasource.username=root
spring.datasource.password=matean2002.
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

## 2. `Book.java` (Model)

The data model for a book, mapped to the `books` table in the `bookdb` database.

```java
package com.matthew.bookdb.mysql.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String author;

    @Column(name = "published_year")
    @JsonProperty("published_year")
    private Integer publishedYear;

    private Double price;

    public Book() {}


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getPublishedYear() {
        return publishedYear;
    }

    public void setPublishedYear(Integer publishedYear) {
        this.publishedYear = publishedYear;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
```

## 3. `BookRepository.java` (Repository)

The Spring Data JPA repository interface for `Book` objects.

```java
package com.matthew.bookdb.repository;

import com.matthew.bookdb.mysql.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
```

## 4. `

The REST controller for handling book-related API requests.

```java
package com.matthew.bookdb.controller;

import com.matthew.bookdb.mysql.model.Book;
import com.matthew.bookdb.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/")
public class BooksController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("books/{id}")
    public Optional<Book> getBookById(@PathVariable Integer id) {
        return bookRepository.findById(id);
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    @PutMapping("books/{id}")
    public Book updateBook(@PathVariable Integer id, @RequestBody Book bookDetails) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setPublishedYear(bookDetails.getPublishedYear());
            book.setPrice(bookDetails.getPrice());
            return bookRepository.save(book);
        }).orElseThrow(() -> new RuntimeException("Book not with id " + id));
    }

    @DeleteMapping("books/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Integer id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return ResponseEntity.ok("Book with id " + id + " deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book with id " + id + " not found.");
        }
    }
}
```
