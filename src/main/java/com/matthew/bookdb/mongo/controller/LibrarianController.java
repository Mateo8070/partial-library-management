package com.matthew.bookdb.mongo.controller;


import com.matthew.bookdb.mongo.model.Librarian;
import com.matthew.bookdb.dtos.ResponseDTO;
import com.matthew.bookdb.mongo.service.LibrarianService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/librarians")
public class LibrarianController {


    private final LibrarianService librarianService;

    public LibrarianController(LibrarianService librarianService){
        this.librarianService = librarianService;
    }


    //getting all librarians

    @GetMapping(produces = "application/json")
    public ResponseDTO getAllLibrarians() {
        return librarianService.getAllLibrarians();
    }

    //getting librarian by id
    @GetMapping("/{id}")
    public Optional<Librarian> getLibrarianById(@PathVariable String id) {
        return librarianService.getLibrarianById(id);
    }

    //creating a librarian
    @PostMapping
    public ResponseEntity<?> createLibrarian(@RequestBody Librarian librarian){
        return librarianService.createLibrarian(librarian);
    }

    //searching by name
    @GetMapping("/search")
    public List<Librarian> searchByName(@RequestParam String name){
        return librarianService.searchByName(name);
    }

    
    //updating a librarian
    @PutMapping("/{id}")
    public Librarian updateLibrarian(@PathVariable String id, @RequestBody Librarian librarianDetails) {
        return librarianService.updateLibrarian(id, librarianDetails);
    }

    //deleting a librarian
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteLibrarian(@PathVariable String id){
        return librarianService.deleteLibrarian(id);
    }

    //filtering by department
    @GetMapping("/filter")
    public List<?> filterByDepartment(@RequestParam(name="dept") String dept){
        return librarianService.filterByDepartment(dept);
    }

    //sorting librarians
    @GetMapping("/sorted")
    public List<Librarian> getLibrariansSorted(@RequestParam String sortBy) {
        return librarianService.getLibrariansSorted(sortBy);
    }

    //paginating librarians
    @GetMapping("/paginated")
    public Page<Librarian> getPaginatedLibrarians(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return librarianService.getPaginatedLibrarians(page, size);
    }
}
