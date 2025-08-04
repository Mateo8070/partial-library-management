# Troubleshooting Notes

This document summarizes the issues faced and their resolutions during the project setup and development.

## Issue 1: MongoDB Connection Error - Missing Database Name

*   **Problem:** The initial build failed with a `java.lang.IllegalArgumentException: Database name must not be empty`.
*   **Cause:** The MongoDB connection URI in `application.properties` was missing the database name.
*   **Resolution:** I updated the `spring.data.mongodb.uri` property in `application.properties` to include the database name (`bookdb`).

## Issue 2: MongoDB Query Error—Invalid Field 'locale'

*   **Problem:** After fixing the connection URI, the application threw a `com.mongodb.MongoQueryException: Command failed with error 2 (BadValue): 'Field 'locale' is invalid in: { locale: "librarians" }'`.
*   **Cause:** The `@Document(collation = "librarians")` annotation in `Librarian.java` was using the `collation` attribute instead of `collection` to specify the collection name.
*   **Resolution:** I corrected the annotation to `@Document(collection = "librarians")` in the `Librarian.java` file.

