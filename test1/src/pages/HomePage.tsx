import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss'; // Import het CSS-bestand

const HomePage = ({ favorites, toggleFavorite }) => {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300');
            // "type": "https://pokeapi.co/api/v2/type/"
            const data = await response.json();
            const results = data.results;

            const pokemonDetails = await Promise.all(
                results.map(async (pokemon) => {
                    const pokemonResponse = await fetch(pokemon.url);
                    const pokemonData = await pokemonResponse.json();
                    return {
                        name: pokemon.name,
                        image: pokemonData.sprites.front_default,
                    };
                })
            );


            setPokemons(pokemonDetails);
        };

        fetchPokemon();
    }, []);

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="home-wrapper">
            <h1 className="home-title">Pokémon List</h1>
            <input
                type="text"
                placeholder="Search a Pokémon"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
            />
            <ul className="pokemon-list">
                {filteredPokemons.map((pokemon) => (
                    <li key={pokemon.name} className="pokemon-card">
                        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                        <h3 className="pokemon-name">{pokemon.name}</h3>
                        <button
                            onClick={() => toggleFavorite(pokemon.name)}
                            className={`favorite-btn ${
                                favorites.includes(pokemon.name) ? 'favorited' : ''
                            }`}
                        >
                            {favorites.includes(pokemon.name) ? 'Unfavorite' : 'Favorite'}
                        </button>
                        <Link to={`/pokemon/${pokemon.name}`} className="details-link">
                            More Details
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;