import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';

// Object met regio's en sprites van de starters
const regionData = {
    'Kanto': {
        start: 1,
        end: 151,
        starters: [
            { id: 1, name: 'bulbasaur' },
            { id: 4, name: 'charmander' },
            { id: 7, name: 'squirtle' }
        ]
    },
    'Johto': {
        start: 152,
        end: 251,
        starters: [
            { id: 152, name: 'chikorita' },
            { id: 155, name: 'cyndaquil' },
            { id: 158, name: 'totodile' }
        ]
    },
    'Hoenn': {
        start: 252,
        end: 386,
        starters: [
            { id: 252, name: 'treecko' },
            { id: 255, name: 'torchic' },
            { id: 258, name: 'mudkip' }
        ]
    },
    'Sinnoh': {
        start: 387,
        end: 494,
        starters: [
            { id: 387, name: 'turtwig' },
            { id: 390, name: 'chimchar' },
            { id: 393, name: 'piplup' }
        ]
    },
    'Unova': {
        start: 495,
        end: 649,
        starters: [
            { id: 495, name: 'snivy' },
            { id: 498, name: 'tepig' },
            { id: 501, name: 'oshawott' }
        ]
    },
    'Kalos': {
        start: 650,
        end: 721,
        starters: [
            { id: 650, name: 'chespin' },
            { id: 653, name: 'fennekin' },
            { id: 656, name: 'froakie' }
        ]
    },
    'Alola': {
        start: 722,
        end: 809,
        starters: [
            { id: 722, name: 'rowlet' },
            { id: 725, name: 'litten' },
            { id: 728, name: 'popplio' }
        ]
    },
    'Galar': {
        start: 810,
        end: 898,
        starters: [
            { id: 810, name: 'grookey' },
            { id: 813, name: 'scorbunny' },
            { id: 816, name: 'sobble' }
        ]
    }
};

const HomePage = ({ favorites, toggleFavorite }) => {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [starterSprites, setStarterSprites] = useState({});

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
            const data = await response.json();
            const results = data.results;

            const pokemonDetails = await Promise.all(
                results.map(async (pokemon: any) => {
                    const pokemonResponse = await fetch(pokemon.url);
                    const pokemonData = await pokemonResponse.json();
                    return {
                        id: pokemonData.id,
                        name: pokemon.name,
                        image: pokemonData.sprites.front_default,
                        types: pokemonData.types.map(type => type.type.name),
                        // stats: pokemonData.stats.map(stat => stat.stat.name)
                    };
                })
            );

            setPokemons(pokemonDetails);
        };

        fetchPokemon();
        fetchStarterSprites();
    }, []);

    // Haal sprites op voor alle starters
    const fetchStarterSprites = async () => {
        const sprites = {};

        // Voor elke regio
        for (const region in regionData) {
            sprites[region] = [];

            // Voor elke starter in de regio
            for (const starter of regionData[region].starters) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${starter.name}`);
                    const data = await response.json();
                    sprites[region].push(data.sprites.front_default);
                } catch (error) {
                    console.error(`Fout bij ophalen van sprite voor ${starter.name}:`, error);
                    sprites[region].push(null); // Placeholder voor ontbrekende sprite
                }
            }
        }

        setStarterSprites(sprites);
    };

    // Functie regio-filter
    const handleRegionFilter = (region) => {
        if (selectedRegion === region) {
            // Als dezelfde regio wordt aangeklikt, reset de filter
            setSelectedRegion('');
        } else {
            // Anders, pas de filter toe
            setSelectedRegion(region);
        }
    };

    // Filter pokemons op regio
    const filteredPokemons = pokemons.filter((pokemon) => {
        // Filter op zoekopdracht
        const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());

        // Filter op regio
        let matchesRegion = true;
        if (selectedRegion) {
            const range = regionData[selectedRegion];
            matchesRegion = pokemon.id >= range.start && pokemon.id <= range.end;
        }

        // Beide filters moeten overeenkomen
        return matchesSearch && matchesRegion;
    });

    return (
        <div className="home-wrapper">
            <h1 className="home-title">Pokédex</h1>
            <h1 className="sub-title">Regional Pokédex Filter</h1>

            {/* Regio-container */}
            <div className="category-container">
                {Object.keys(regionData).map((region) => (
                    <div
                        key={region}
                        className={`category-item ${selectedRegion === region ? 'selected' : ''}`}
                        onClick={() => handleRegionFilter(region)}
                    >
                        <div className="region-name">{region}</div>
                        <div className="starter-sprites">
                            {starterSprites[region]?.map((sprite, index) => (
                                sprite && (
                                    <img
                                        key={index}
                                        src={sprite}
                                        alt={`${region} starter ${index}`}
                                        className="starter-sprite"
                                    />
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Actieve filter indicator */}
            {selectedRegion && (
                <div className="active-filter">
                    Filtering by region: {selectedRegion}
                    <button className="clear-filter" onClick={() => setSelectedRegion('')}>
                        Clear Filter
                    </button>
                </div>
            )}

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
                        <div className="pokemon-types">
                            {pokemon.types && pokemon.types.map((type) => (
                                <span
                                    key={`${pokemon.name}-${type}`}
                                    className={`type-badge type-${type}`}
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
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