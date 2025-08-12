import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, handleEdit, handleDelete }) => {
    const navigate = useNavigate();


    //dynamic coloring based on book title
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
    const imageUrl = `https://placehold.co/300x200/${bgColor.replace('#','')}/fff?text=${book.title.replace(/\s/g, '+')}`;

    return (
        <div className="card h-100" style={{ cursor: 'pointer' }} onClick={() => navigate(`/books/${book.id}`)}>
            <img src={imageUrl} className="card-img-top" alt={`Cover for ${book.title}`} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text"><strong>Author:</strong> {book.author}</p>
                <p className="card-text"><strong>Published:</strong> {book.published_year}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <p className="card-text mb-0"><strong>Price:</strong> ${book.price?.toFixed(2)}</p>
                    <div onClick={e => e.stopPropagation()}>
                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(book)}>Edit</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(book.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;