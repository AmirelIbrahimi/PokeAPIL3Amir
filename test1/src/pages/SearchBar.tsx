// SearchBar.tsx
import React from 'react';
import './HomePage.scss';
interface SearchBarProps {
    search: string;
    setSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
    return (
            <input
                type="text"
                placeholder="Zoek Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

    );
};

export default SearchBar;