package com.matthew.bookdb.mysql.service;

import com.matthew.bookdb.mysql.model.Book;
import com.matthew.bookdb.mysql.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.getBooksCustom();
    }

    public List<Book> searchBooks(String query, String type) {
        if (query == null || query.trim().isEmpty()) {
            return Collections.emptyList();
        }

        return switch (type) {
            case "title" -> bookRepository.findByTitleContainingIgnoreCase(query);
            case "author" -> bookRepository.findByAuthorContainingIgnoreCase(query);
            default -> Collections.emptyList();
        };
    }

    public Optional<Book> getBookById(Integer id) {
        return bookRepository.findById(id);
    }

    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Integer id, Book bookDetails) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setPublishedYear(bookDetails.getPublishedYear());
            book.setPrice(bookDetails.getPrice());
            return bookRepository.save(book);
        }).orElseThrow(() -> new RuntimeException("Book not with id " + id));
    }

    public ResponseEntity<String> deleteBook(Integer id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return ResponseEntity.ok("Book with id " + id + " deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book with id " + id + " not found.");
        }
    }
}
