package com.matthew.bookdb.mysql.controller;

import com.matthew.bookdb.mysql.model.Book;
import com.matthew.bookdb.mysql.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/")
public class BookController {

    BookService bookService;

    public BookController (BookService bookService) {
        this.bookService = bookService;
    }

    //getting all books
    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    //getting book by id
    @GetMapping("books/{id}")
    public Optional<Book> getBookById(@PathVariable Integer id) {
        return bookService.getBookById(id);
    }

    //creating a book
    @PostMapping("/books")
    public Book createBook(@RequestBody Book book) {
        return bookService.createBook(book);
    }

    //updating a book
    @PutMapping("books/{id}")
    public Book updateBook(@PathVariable Integer id, @RequestBody Book bookDetails) {
        return bookService.updateBook(id, bookDetails);
    }

    //deleting a book
    @DeleteMapping("books/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Integer id) {
        return bookService.deleteBook(id);
    }

    //getting book by author
    @GetMapping("books/author/{author}")
    public List<Book> getBookByAuthor(@PathVariable(name = "author") String author){
        return bookService.getBookByAuthor(author);
    }
}
