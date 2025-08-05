package com.matthew.bookdb.mongo.service;


import com.matthew.bookdb.dtos.LibrarianDTO;
import com.matthew.bookdb.dtos.ResponseDTO;
import com.matthew.bookdb.mongo.model.Librarian;
import com.matthew.bookdb.mongo.repository.LibrarianRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LibrarianService {

    LibrarianRepository librarianRepository;

    public LibrarianService (LibrarianRepository librarianRepository) {
        this.librarianRepository = librarianRepository;
    }


    public ResponseDTO getAllLibrarians(){
        List<LibrarianDTO> librarianDTOList = librarianRepository.findAll()
                .stream()
                .map(librarian -> new LibrarianDTO(librarian.getName(),librarian.getEmail(), librarian.getDepartment()))
                .collect(Collectors.toSet())
                .stream().toList();

        return new ResponseDTO(librarianDTOList.size(), librarianDTOList, "success");
    }

    public ResponseEntity<?> createLibrarian(Librarian librarian) {
        if (librarianRepository.findByEmail(librarian.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Librarian with email " + librarian.getEmail() + " already exists.");
        }
        Librarian savedLibrarian = librarianRepository.save(librarian);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLibrarian);
    }

    public ResponseEntity<Map<String, String>> deleteLibrarian(String id) {
        if(librarianRepository.existsById(id)){
            librarianRepository.deleteById(id);
            return ResponseEntity.of(Optional.of(Map.of("msg", "success")));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("msg", "Librarian not found"));
    }

    public Librarian updateLibrarian(String id, Librarian librarianDetails) {
        return librarianRepository.findById(id).map(librarian -> {
            librarian.setName(librarianDetails.getName());
            librarian.setEmail(librarianDetails.getEmail());
            librarian.setDepartment(librarianDetails.getDepartment());
            return librarianRepository.save(librarian);
        }).orElseThrow(() -> new RuntimeException("Librarian not found with id " + id));
    }

    public List<Librarian> getLibrariansSorted(String sortBy) {
        List<String> validSortFields = List.of("id", "name", "email", "department");
        if (!validSortFields.contains(sortBy)) {
            sortBy = "name"; // default sort
        }
        return librarianRepository.findAll(Sort.by(sortBy));
    }

    public Optional<Librarian> getLibrarianById(String id) {
        return librarianRepository.findById(id);
    }

    public List<Librarian> searchByName(String name) {
        return librarianRepository.findByNameIgnoreCase(name);
    }

    public List<?> filterByDepartment(String dept) {
      List<Librarian> librarians =  librarianRepository.findByDepartmentContainingIgnoreCase(dept);

      if(librarians.isEmpty()){
          return List.of("No users found for that department");
      }
      return librarians;
    }

    public Page<Librarian> getPaginatedLibrarians(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return librarianRepository.findAll(pageable);
    }

    public ResponseEntity<Map<String, String>> deleteById(String id) {
        if(librarianRepository.findById(id).isPresent()){
            librarianRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(Map.of("status", "success"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("status", "No user with id: " + id +" found!"));
    }
}
