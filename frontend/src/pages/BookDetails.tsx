import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
  id: number | string;
  title: string;
  author: string;
  published_year?: number;
  publishedYear?: number;
  price?: number;
}

const API_URL = 'http://localhost:8080/api/v1';

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();

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

    setIsLoading(true);
    axios.get(`${API_URL}/books/${id}`)
      .then(res => {
        setBook(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch book:", err);
        if (axios.isAxiosError(err) && err.response) {
          setError(`Error: ${err.response.status} - ${err.response.data.message || 'Could not fetch book.'}`);
        } else {
          setError(err.message || 'An unknown error occurred.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!book?.title) {
      return;
    }

    const fetchGeminiSummary = async (title: string) => {
      setLoadingGemini(true);
      setGeminiDetails('');

      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error('No Gemini API key found in environment variables.');
        }


        //fetching a summary from google generative apis
        const response = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-goog-api-key': apiKey,
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `Give a short, relevant, and creative summary for a book titled: "${title}". make it short and simple. just one paragraph` }] }]
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
        console.error("Failed to fetch Gemini details:", e);
        if (e instanceof Error) {
          setGeminiDetails(`Error: ${e.message}`);
        } else {
          setGeminiDetails('An unknown error occurred while fetching the summary.');
        }
      } finally {
        setLoadingGemini(false);
      }
    };

    fetchGeminiSummary(book.title);

  }, [book]);

  if (isLoading) return <div className="container mt-4">Loading book details...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;
  if (!book) return <div className="container mt-4">Book not found.</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img src="/src/assets/book_cover.png" alt="Book Cover" className="img-fluid rounded shadow-sm mb-4" />
        </div>
        <div className="col-md-8">
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Published Year:</strong> {book.published_year ?? book.publishedYear ?? 'N/A'}</p>
          <p><strong>Price:</strong> {book.price ? `$${book.price.toFixed(2)}` : 'N/A'}</p>
          <hr />
          
          <h5>Gemini AI Summary</h5>
          {loadingGemini ? (
            <p>Generating summary...</p>
          ) : (
            <p style={{ whiteSpace: 'pre-line' }}>{geminiDetails}</p>
          )}

          <a href="/" className="btn btn-secondary mt-3">Back to List</a>
        </div>
      </div>
    </div>
  );
}