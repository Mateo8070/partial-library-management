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
public class BookController {

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
