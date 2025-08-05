package com.matthew.bookdb.mongo.controller;


import com.matthew.bookdb.mongo.model.Librarian;
import com.matthew.bookdb.dtos.ResponseDTO;
import com.matthew.bookdb.mongo.service.LibrarianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/librarians")
public class LibrarianController {

    @Autowired
    private LibrarianService librarianService;

    @GetMapping
    public ResponseDTO getAllLibrarians(){
        return librarianService.getAllLibrarians();
    }

    @GetMapping("/{id}")
    public Optional<Librarian> getLibrarianById(@PathVariable String id) {
        return librarianService.getLibrarianById(id);
    }

    @PostMapping
    public ResponseEntity<?> createLibrarian(@RequestBody Librarian librarian){
        return librarianService.createLibrarian(librarian);
    }

    @GetMapping("/search")
    public List<Librarian> searchByName(@RequestParam String name){
        return librarianService.searchByName(name);
    }

    @PutMapping("/{id}")
    public Librarian updateLibrarian(@PathVariable String id, @RequestBody Librarian librarianDetails) {
        return librarianService.updateLibrarian(id, librarianDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteLibrarian(@PathVariable String id){
        return librarianService.deleteLibrarian(id);
    }

    //filtering by department
    @GetMapping("/filter")
    public List<?> filterByDepartment(@RequestParam(name="dept") String dept){
        return librarianService.filterByDepartment(dept);
    }

    @GetMapping("/sorted")
    public List<Librarian> getLibrariansSorted(@RequestParam String sortBy) {
        return librarianService.getLibrariansSorted(sortBy);
    }

    @GetMapping("/paginated")
    public Page<Librarian> getPaginatedLibrarians(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return librarianService.getPaginatedLibrarians(page, size);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteById(@PathVariable String id){
        return librarianService.deleteById(id);
    }

}
