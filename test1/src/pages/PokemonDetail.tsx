import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PokemonDetail.scss'; // Import het CSS-bestand

const PokemonDetail = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);

    const formatHeight = (height) => {
        // const heightInCm = height * 10;
        const heightInM = height / 10;
        return `(${heightInM}m)`;
    };

    const formatWeight = (weight) => {
        return `${weight / 10}kg`;
    };

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            // const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
            const data = await response.json();

            const { id, ...detailsWithoutId } = data;
            setPokemon(detailsWithoutId);
        };

        fetchPokemonDetail();
    }, [name]);

    if (!pokemon) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="detail-wrapper">
            <h1 className="detail-title">{pokemon.name}</h1>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="detail-image"
            />
            <div className="detail-info">
                <p><strong>Height:</strong> {formatHeight(pokemon.height)}</p>
                <p><strong>Weight:</strong> {formatWeight(pokemon.weight)}</p>
                <p><strong>Exp gain:</strong> {pokemon.base_experience}</p>
                <p><strong>Abilities:</strong><ul>
                    {pokemon.abilities.map((abilityObject, index) => (
                        <li key={index}>{abilityObject.ability.name}</li>
                    ))}

                </ul></p>
            </div>
        </div>
    );
};

export default PokemonDetail;