import { useState, useEffect, type FormEvent } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';
import BookCard from './components/BookCard';
import Header from './components/Header';
import AddBookModal from './components/AddBookModal';
import BookDetails from './pages/BookDetails';

const API_URL = 'http://localhost:8080/api/v1';

export interface Book {
    id?: number;
    title: string;
    author: string;
    publishedYear: number;
    price: number;
}

function App() {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchType, setSearchType] = useState<'title' | 'author'>('author');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchAllBooks = async () => {
        try {
            const response = await axios.get<Book[]>(`${API_URL}/books`);
            setBooks(response.data || []);
            setFilteredBooks(response.data || []);
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    useEffect(() => {
        fetchAllBooks();
    }, []);

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim() === '') {
            fetchAllBooks();
            return;
        }

        let url = `${API_URL}/books/search?query=${encodeURIComponent(searchTerm)}&type=${searchType}`;
        console.log(`${API_URL}/books/search?query=${encodeURIComponent(searchTerm)}&type=${searchType}`)

        try {
            const response = await axios.get<Book[]>(url);
            setFilteredBooks(response.data || []);
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            setFilteredBooks([]);
        }
    };

    const handleSaveBook = async (bookData: Book) => {
        try {
            if (bookData.id) {
                await axios.put(`${API_URL}/books/${bookData.id}`, bookData);
            } else {
                await axios.post(`${API_URL}/books`, bookData);
            }
            setShowModal(false);
            fetchAllBooks();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const handleDeleteBook = async (bookId: number) => {
        const bookToDelete = books.find(b => b.id === bookId);
        console.log('handleDeleteBook called with bookId:', bookId, 'book object:', bookToDelete);
        if (!bookId) {
            setError('Invalid book ID');
            return;
        }
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await axios.delete(`${API_URL}/books/${bookId}`);
                fetchAllBooks();
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                }
            }
        }
    };

    const openEditModal = (book: Book) => {
        console.log('openEditModal called with book:', book);
        setEditingBook(book);
        setShowModal(true);
    };

    const openAddModal = () => {
        setEditingBook(null);
        setShowModal(true);
    };

    console.log('App render: showModal =', showModal, 'editingBook =', editingBook);
    return (
        <>
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                openModal={openAddModal}
                searchType={searchType}
                setSearchType={setSearchType}
            />
            <Routes>
                <Route path="/" element={
                    <div className="container mt-4">
                        <h3 className="mb-4">Books Collection</h3>
                        {error && (
                            <div className="alert alert-danger">
                                <strong>Error:</strong> {error}
                            </div>
                        )}
                        {filteredBooks.length === 0 && !error ? (
                            <p className="text-muted">No books found.</p>
                        ) : (
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                {filteredBooks.map((book, index) => (
                                    <div key={book.id ?? `book-${index}`} className="col">
                                        <BookCard
                                            book={book}
                                            handleEdit={() => openEditModal(book)}
                                            handleDelete={() => handleDeleteBook(book.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <AddBookModal
                            show={showModal}
                            handleClose={() => setShowModal(false)}
                            handleSave={handleSaveBook}
                            editingBook={editingBook}
                        />
                    </div>
                } />
                <Route path="/books/:id" element={<BookDetails />} />
            </Routes>
        </>
    );
}

export default App;