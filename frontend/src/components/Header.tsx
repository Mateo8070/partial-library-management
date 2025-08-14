interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    openModal: () => void;
    searchType: 'title' | 'author';
    setSearchType: (type: 'title' | 'author') => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, openModal, searchType, setSearchType }) => {
    // @ts-ignore
    // @ts-ignore
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 sticky-top" style={{zIndex: 1040}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">BookManager</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button className="btn btn-outline-primary d-flex align-items-center" onClick={openModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-plus-lg me-1" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                </svg>
                                Add Book
                            </button>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">All Books</a>
                        </li>
                    </ul>
                    <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group me-2 rounded-3 overflow-hidden">
                            <span className="input-group-text rounded-start-3 bg-secondary text-white" id="search-addon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                </svg>
                            </span>
                            <input 
                                className="form-control form-control-dark" 
                                type="search" 
                                placeholder={`Search by ${searchType}...`} 
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select 
                                className="form-select custom-search-select rounded-end-3 form-select-dark" 
                                aria-label="Search type"
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value as 'title' | 'author')}
                            >
                                <option value="title">Title</option>
                                <option value="author">Author</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Header;