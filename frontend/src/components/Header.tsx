interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: (e: React.FormEvent) => void;
    openModal: () => void;
    searchType: 'title' | 'author';
    setSearchType: (type: 'title' | 'author') => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, handleSearch, openModal, searchType, setSearchType }) => {
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
                            <button className="btn btn-link nav-link" onClick={openModal}>Add Book</button>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">All Books</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <div className="input-group me-2">
                            <input 
                                className="form-control" 
                                type="search" 
                                placeholder={`Search by ${searchType}...`} 
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    handleSearch(e as unknown as React.FormEvent); 
                                }}
                            />
                            <select 
                                className="form-select custom-search-select" 
                                aria-label="Search type"
                                value={searchType}
                                onChange={(e) => {
                                    setSearchType(e.target.value as 'title' | 'author');
                                    handleSearch(e as unknown as React.FormEvent); 
                                }}
                            >
                                <option value="author">Author</option>
                                <option value="title">Title</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Header;