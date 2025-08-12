
// @ts-ignore
const BookCard = ({ book, handleEdit, handleDelete }) => {
    const imageUrl = `https://placehold.co/300x200?text=${book.title.replace(/\s/g, '+')}`;

    return (
        <div className="card h-100">
            <img src={imageUrl} className="card-img-top" alt={`Cover for ${book.title}`} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text"><strong>Author:</strong> {book.author}</p>
                <p className="card-text"><strong>Published:</strong> {book.publishedYear}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <p className="card-text mb-0"><strong>Price:</strong> ${book.price?.toFixed(2)}</p>
                    <div>
                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(book)}>Edit</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
