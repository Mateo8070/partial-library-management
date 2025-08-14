import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ConfirmEditModal from './ConfirmEditModal';
import type {Book} from "../App.tsx";

interface AddBookModalProps {
    show: boolean;
    handleClose: () => void;
    handleSave: (book: Book) => void;
    editingBook: Book | null;
}

function AddBookModal({ show, handleClose, handleSave, editingBook }: AddBookModalProps) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [price, setPrice] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (editingBook) {
            setTitle(editingBook.title || '');
            setAuthor(editingBook.author || '');
            const year = (editingBook.publishedYear);
            setPublishedYear(year ? year.toString() : '');
            setPrice(editingBook.price?.toString() ?? '');
        } else {
            setTitle('');
            setAuthor('');
            setPublishedYear('');
            setPrice('');
        }
    }, [editingBook]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (editingBook) {
            setShowConfirm(true);
        } else {
            doSave();
        }
    };

    const doSave = () => {
        const newBook: Book = {
            id: editingBook?.id,
            title,
            author,
            publishedYear: Number(publishedYear),
            price: Number(price),
        };
        handleSave(newBook);
        setShowConfirm(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editingBook ? 'Edit Book' : 'Add New Book'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                value={author}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Published Year</Form.Label>
                            <Form.Control
                                type="number"
                                value={publishedYear}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPublishedYear(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <ConfirmEditModal
                show={showConfirm}
                onConfirm={doSave}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
}

export default AddBookModal;