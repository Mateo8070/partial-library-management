package com.matthew.bookdb.mysql.repository;

import com.matthew.bookdb.mysql.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {

    @Query("SELECT b from Book b")
    public List<Book> getBooksCustom();

    @Query("SELECT b FROM Book b WHERE b.author = :authorName")
    List<Book> findBooksByAuthor(@Param("authorName") String author);

    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByAuthorContainingIgnoreCase(String author);
}
