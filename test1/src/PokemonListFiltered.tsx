// PokemonList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from './types';
import { regionData } from './regionData';

interface PokemonListProps {
    pokemons: Pokemon[];
    search: string;
    selectedRegion: string;
    favorites: number[];
    toggleFavorite: (id: number) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ 
    pokemons, 
    search, 
    selectedRegion, 
    favorites, 
    toggleFavorite 
}) => {
    // Filter pokémon op basis van zoekterm en geselecteerde regio
    const filteredPokemon = pokemons.filter(pokemon => {
        // Filter op naam
        const nameMatch = pokemon.name.toLowerCase().includes(search.toLowerCase());
        
        // Filter op regio
        const regionMatch = selectedRegion 
            ? pokemon.id >= regionData[selectedRegion].start && pokemon.id <= regionData[selectedRegion].end
            : true;
        
        return nameMatch && regionMatch;
    });

    return (
        <div className="pokemon-list">
            {filteredPokemon.map(pokemon => (
                <div key={pokemon.id} className="pokemon-card">
                    <button
                        className={`favorite-button ${favorites.includes(pokemon.id) ? 'favorited' : ''}`}
                        onClick={() => toggleFavorite(pokemon.id)}
                    >
                        {favorites.includes(pokemon.id) ? '★' : '☆'}
                    </button>
                    <Link to={`/pokemon/${pokemon.id}`}>
                        <img src={pokemon.image} alt={pokemon.name} />
                        <h3>{pokemon.name}</h3>
                        <div className="pokemon-types">
                            {pokemon.types.map(type => (
                                <span key={type} className={`type ${type}`}>{type}</span>
                            ))}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default PokemonList;