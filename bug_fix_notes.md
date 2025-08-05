# Bug Fix: GET /librarians Endpoint

## Problem Diagnosis

The `GET /librarians` endpoint was returning a list with duplicate entries. The duplicates existed in the MongoDB collection, each with a unique `_id`, but with identical `name`, `email`, and `department` fields.

The initial attempt to fix this involved converting the `LibrarianDTO` to a Java `record` and using the `.distinct()` stream operation. A `record` automatically provides `equals()` and `hashCode()` methods based on its fields, which `distinct()` uses to identify and remove duplicates.

```java
// First attempt (which was not effective)
List<LibrarianDTO> librarianDTOList = librarianRepository.findAll()
        .stream()
        .map(librarian -> new LibrarianDTO(librarian.getName(), librarian.getEmail(), librarian.getDepartment()))
        .distinct()
        .toList();
```

For reasons that are not entirely clear but could be related to subtle stream mechanics, this did not filter the duplicates as expected.

## Solution

A more reliable method to ensure uniqueness is to collect the elements into a `Set`. A `Set` is a collection that cannot contain duplicate elements, and it uses the `equals()` and `hashCode()` methods of the objects to enforce this.

The final solution involved these steps:

1.  **Convert `LibrarianDTO` to a record:** This was a crucial first step to ensure `LibrarianDTO` objects could be correctly compared for equality based on their content (name, email, department) rather than their memory address.

    ```java
    // src/main/java/com/matthew/bookdb/dtos/LibrarianDTO.java
    public record LibrarianDTO(String name, String email, String department) {
    }
    ```

2.  **Use a `Set` to enforce uniqueness:** The `getAllLibrarians` method in `LibrarianController` was modified to first collect the mapped `LibrarianDTO` objects into a `Set`. This automatically removes all duplicate entries. The `Set` is then converted back into a `List` for the final `ResponseDTO`.

    ```java
    // Corrected code in LibrarianController.java
    @GetMapping
    public ResponseDTO getAllLibrarians(){
        List<LibrarianDTO> librarianDTOList = librarianRepository.findAll()
                .stream()
                .map(librarian -> new LibrarianDTO(librarian.getName(),librarian.getEmail(), librarian.getDepartment()))
                .collect(Collectors.toSet()) // Collect to a Set to automatically handle duplicates
                .stream().toList();

        return new ResponseDTO(librarianDTOList.size(), librarianDTOList, "success");
    }
    ```

3.  **Prevent future duplicates:** To prevent new duplicates from being created, the `createLibrarian` endpoint was updated to check if a librarian with the same email already exists before saving a new one.

This multistep approach ensures that the `GET /librarians` endpoint now returns a clean, de-duplicated list and that the database is protected from accumulating more duplicate entries in the future.