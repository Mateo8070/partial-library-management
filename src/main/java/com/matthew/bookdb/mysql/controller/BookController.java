package com.matthew.bookdb.mysql.controller;

import com.matthew.bookdb.mysql.model.Book;
import com.matthew.bookdb.mysql.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("books/{id}")
    public Optional<Book> getBookById(@PathVariable Integer id) {
        return bookService.getBookById(id);
    }

    @PostMapping("/books")
    public Book createBook(@RequestBody Book book) {
        return bookService.createBook(book);
    }

    @PutMapping("books/{id}")
    public Book updateBook(@PathVariable Integer id, @RequestBody Book bookDetails) {
        return bookService.updateBook(id, bookDetails);
    }

    @DeleteMapping("books/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Integer id) {
        return bookService.deleteBook(id);
    }

    @GetMapping("books/author/{author}")
    public List<Book> getBookByAuthor(@PathVariable(name = "author") String author){
        return bookService.getBookByAuthor(author);
    }
}
