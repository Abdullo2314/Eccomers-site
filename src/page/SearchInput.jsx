import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

function SearchInput() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                fetch("http://localhost:8000/api")
                    .then((res) => res.json())
                    .then((data) => {
                        const filtered = data.filter((item) =>
                            item.name.toLowerCase().includes(query.toLowerCase()) ||
                            item.description.toLowerCase().includes(query.toLowerCase())
                        );
                        setResults(filtered);
                        setNotFound(filtered.length === 0);
                    })
                    .catch((err) => console.error("Ошибка поиска:", err));
            } else {
                setResults([]);
                setNotFound(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleSelect = (id) => {
        navigate(`/product/${id}`);
        setQuery("");
        setResults([]);
        setNotFound(false);
    };

    const handleSearchClick = () => {
        if (results.length > 0) {
            handleSelect(results[0].id);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    };

    const clearSearch = () => {
        setQuery("");
        setResults([]);
        setNotFound(false);
    };

    return (
        <div>
            <div className='header_input'>
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Search className='Search' />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-[70px] top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="Очистить"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {(results.length > 0 || notFound) && (
                <ul className="absolute z-50 top-full left-0 right-0 bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto text-sm">
                    {results.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {item.name}
                        </li>
                    ))}
                    {notFound && (
                        <li className="px-4 py-2 text-gray-500">Ничего не найдено</li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default SearchInput;