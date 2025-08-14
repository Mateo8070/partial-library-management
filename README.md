# Book Management Application

This is a full-stack application for managing a collection of books. It allows users to view, add, edit, and delete book entries, and search for books by title or author.


## Features

*   View a list of all books.
*   Add new books with title, author, published year, and price.
*   Edit existing book details.
*   Delete books.
*   Search for books by title or author.
*   Responsive and professional-looking user interface.

## Technologies Used

### Frontend

*   **React:** JavaScript library for building user interfaces.
*   **TypeScript:** Superset of JavaScript that adds static typing.
*   **Vite:** Fast build tool for modern web projects.
*   **Bootstrap:** CSS framework for responsive and mobile-first front-end web development.
*   **Axios:** Promise-based HTTP client for the browser and Node.js.

### Backend

*   **Spring Boot:** Framework for building production-ready, stand-alone Spring applications.
*   **Java 24:** Programming language.
*   **Maven:** Build automation tool.
*   **MongoDB:** NoSQL document database.
*   **Spring Data MongoDB:** Spring module for interacting with MongoDB.
*   **Spring Web:** For building RESTful APIs.

## Prerequisites

Before running the application, ensure you have the following installed on your system:

*   **Java Development Kit (JDK) 24.0.2 or higher**
*   **Node.js v22.18.0 or higher**
*   **npm 10.9.3 or higher**
*   **Maven 3.8.7 or higher**
*   **MongoDB Community Server** (running locally or accessible remotely)
    *   **Note:** This project uses MongoDB for data persistence, not MySQL. Please ensure MongoDB is running and accessible.

## Setup Instructions

Follow these steps to get the application up and running on your local machine.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd partial-library-management-master
```

### 2. Start MongoDB

The database is remote.

### 3. Backend Setup and Run

Navigate to the backend project root directory (where `pom.xml` is located):

```bash
cd partial-library-management-master
```

Build and run the Spring Boot application using Maven:

```bash
mvn clean install
mvn spring-boot:run
```

The backend API will typically start on `http://localhost:8080`.

### 4. Frontend Setup and Run

Open a new terminal and navigate to the frontend project directory:

```bash
cd partial-library-management-master/frontend
```

Install the Node.js dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm start
```

The frontend application will typically open in your browser at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

Once both the backend and frontend servers are running:

1.  Open your web browser and go to `http://localhost:5173`.
2.  You will see the list of books. You can use the search bar to filter books by title or author.
3.  Click the "+ Add Book" button to add a new book.
4.  Use the "Edit" and "Delete" buttons on each book card to modify or remove entries.

---

