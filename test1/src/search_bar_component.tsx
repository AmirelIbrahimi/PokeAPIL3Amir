// SearchBar.tsx
import React from 'react';

interface SearchBarProps {
    search: string;
    setSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Zoek Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;