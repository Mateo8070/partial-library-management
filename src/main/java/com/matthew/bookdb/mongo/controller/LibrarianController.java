package com.matthew.bookdb.mongo.controller;


import com.matthew.bookdb.mongo.model.Librarian;
import com.matthew.bookdb.mongo.model.LibrarianDTO;
import com.matthew.bookdb.mongo.repository.LibrarianRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/librarians")
public class LibrarianController {

    LibrarianRepository librarianRepository;

    public LibrarianController(LibrarianRepository librarianRepository) {
        this.librarianRepository = librarianRepository;
    }

    @GetMapping
    public List<LibrarianDTO> getAllLibrarians(){
        return librarianRepository.findAll().stream().map(librarian -> new LibrarianDTO(librarian.getName(),librarian.getEmail(), librarian.getDepartment())).toList();
    }

    @GetMapping("/{id}")
    public Optional<Librarian> getLibrarianById(@PathVariable String id) {
        return librarianRepository.findById(id);
    }

    @PostMapping
    public String createLibrarian(@RequestBody Librarian librarian){
        return librarianRepository.save(librarian).getName();
    }

    @GetMapping("/search")
    public List<Librarian> searchByName(@RequestParam String name){
        return librarianRepository.findByNameIgnoreCase(name);
    }

    @PutMapping("/{id}")
    public Librarian updateLibrarian(@PathVariable String id, @RequestBody Librarian librarianDetails) {
        return librarianRepository.findById(id).map(librarian -> {
            librarian.setName(librarianDetails.getName());
            librarian.setEmail(librarianDetails.getEmail());
            librarian.setDepartment(librarianDetails.getDepartment());
            return librarianRepository.save(librarian);
        }).orElseThrow(() -> new RuntimeException("Librarian not found with id " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteLibrarian(@PathVariable String id){
        if(librarianRepository.existsById(id)){
            librarianRepository.deleteById(id);
            return ResponseEntity.of(Optional.of(Map.of("msg", "success")));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("msg", "Librarian not found"));
    }

    //filtering by department
    @GetMapping("/filter")
    public List<Librarian> filterByDepartment(@RequestParam(name="dept") String dept){
        return librarianRepository.findByDepartmentContainingIgnoreCase(dept);
    }

    @GetMapping("/sorted")
    public List<Librarian> getLibrariansSorted(@RequestParam String sortBy) {
        List<String> validSortFields = List.of("id", "name", "email", "department");
        if (!validSortFields.contains(sortBy)) {
            sortBy = "name"; // default sort
        }
        return librarianRepository.findAll(Sort.by(sortBy));
    }

    @GetMapping("/paginated")
    public Page<Librarian> getPaginatedLibrarians(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return librarianRepository.findAll(pageable);
    }


}
