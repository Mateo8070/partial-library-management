import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Book } from '../App';

interface BookDetailsProps {
    books: Book[];
}

const API_URL = 'http://localhost:8080/api/v1';

const BookDetails: React.FC<BookDetailsProps> = ({ books }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [book, setBook] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [geminiDetails, setGeminiDetails] = useState<string>('');
    const [loadingGemini, setLoadingGemini] = useState<boolean>(false);

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            setError("No book ID provided.");
            return;
        }

        const fetchBook = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${API_URL}/books/${id}`);
                setBook(response.data);
                setError(null);
            } catch (err) {
                const fallbackBook = books.find(b => String(b.id) === id);
                if (fallbackBook) {
                    setBook(fallbackBook);
                    setError(null);
                } else {
                    setError('Book not found.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchBook();
    }, [id, books]);

    useEffect(() => {
        if (!book?.title) {
            return;
        }

        const fetchGeminiSummary = async (title: string) => {
            setLoadingGemini(true);
            setGeminiDetails('');

            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                setGeminiDetails('Error: API key is missing. Please set the VITE_GEMINI_API_KEY environment variable.');
                setLoadingGemini(false);
                return;
            }

            try {
                const response = await fetch(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-goog-api-key': apiKey,
                        },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: `Give a short, relevant, and creative summary for a book titled: "${title}". Make it short and simple, just one paragraph.` }] }]
                        })
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                setGeminiDetails(summary || 'No summary could be generated.');

            } catch (e: unknown) {
                if (e instanceof Error) {
                    setGeminiDetails(`Error generating summary: ${e.message}`);
                } else {
                    setGeminiDetails('An unknown error occurred while fetching the summary.');
                }
            } finally {
                setLoadingGemini(false);
            }
        };

        fetchGeminiSummary(book.title);

    }, [book]);

    if (isLoading) return <div className="container mt-4"><p>Loading book details...</p></div>;

    if (error) return (
        <div className="container mt-4 alert alert-danger">
            {error}
            <button className="btn btn-secondary mt-3 d-block" onClick={() => navigate('/')}>
                Back to Books
            </button>
        </div>
    );

    if (!book) return (
        <div className="container mt-4">
            <h3>Book Not Found</h3>
            <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
                Back to Books
            </button>
        </div>
    );

    const getColorFromTitle = (title: string): string => {
        const colors = [
            '#e29f03', '#812973', '#FF6800', '#721212', '#C10020', '#006e06', '#4e3c31',
            '#006e2e', '#F6768E', '#00538A', '#FF7A5C', '#53377A', '#684d2a', '#a11740',
            '#F4C800', '#104053ff', '#6a7a00', '#593315', '#F13A13', '#1e201a', '#2d7dd2', '#97cc04', '#ffa400', '#ff6f59', '#c5283d'
        ];
        let hash = 0;
        for (let i = 0; i < title.length; i++) {
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }
        const idx = Math.abs(hash) % colors.length;
        return colors[idx];
    };

    const bgColor = getColorFromTitle(book.title || 'A');
    const imageUrl = `https://placehold.co/400x500/${bgColor.replace('#','')}/fff?text=${encodeURIComponent(book.title)}`;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <img src={imageUrl} alt={`Cover for ${book.title}`} className="img-fluid rounded shadow-sm mb-4" />
                </div>
                <div className="col-md-8">
                    <h2>{book.title}</h2>
                    <p className="lead text-muted">by {book.author}</p>
                    <p><strong>Published Year:</strong> {book.publishedYear ?? 'N/A'}</p>
                    <p><strong>Price:</strong> {book.price ? `$${book.price.toFixed(2)}` : 'N/A'}</p>
                    <hr />

                    <h5>Gemini AI Summary</h5>
                    {loadingGemini ? (
                        <div className="d-flex align-items-center">
                            <strong role="status">Generating summary...</strong>
                            <div className="spinner-border ms-auto" aria-hidden="true"></div>
                        </div>
                    ) : (
                        <p style={{ whiteSpace: 'pre-line' }}>{geminiDetails}</p>
                    )}

                    <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>Back to List</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;