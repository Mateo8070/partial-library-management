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

    public void setPrice (Double price) {
        this.price = price;
    }

    private Double price;

    public String getTitle () {
        return title;
    }

    public void setTitle (String title) {
        this.title = title;
    }

    public String getAuthor () {
        return author;
    }

    public void setAuthor (String author) {
        this.author = author;
    }

    public Integer getPublishedYear () {
        return publishedYear;
    }

    public void setPublishedYear (Integer publishedYear) {
        this.publishedYear = publishedYear;
    }

    public Double getPrice () {
        return price;
    }

}
