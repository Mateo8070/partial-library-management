import React from 'react';

const Header = ({ searchTerm, setSearchTerm, handleSearch, openModal }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">BookManager</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={openModal}>Add Book</button>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">All Books</a>
                        </li>
                    </ul>
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search by author..." 
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Header;
