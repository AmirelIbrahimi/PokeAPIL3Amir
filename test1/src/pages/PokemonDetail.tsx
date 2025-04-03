import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PokemonDetail.scss';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const PokemonDetail = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);

    const formatHeight = (height) => {
        const heightInM = height / 10;
        return `(${heightInM}m)`;
    };

    const formatWeight = (weight) => {
        return `${weight / 10}kg`;
    };

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();

            const { id, ...detailsWithoutId } = data;
            setPokemon(detailsWithoutId);
        };

        fetchPokemonDetail();
    }, [name]);

    if (!pokemon) {
        return <p className="loading">Loading...</p>;
    }

    const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
    };

    const statColors = {
        hp: 'lightgreen',
        attack: 'yellow',
        defense: 'darkorange',
        'special-attack': 'lightblue',
        'special-defense': '#3e7cf1',
        speed: 'magenta'
    };

    const getPrimaryTypeColor = () => {
        if (!pokemon || !pokemon.types || pokemon.types.length === 0) {
            return '#f9f9f9'; // Standaard achtergrondkleur als fallback
        }

        const primaryType = pokemon.types[0].type.name;
        return typeColors[primaryType] || '#f9f9f9'; // Fallback naar standaard als type niet bekend is
    };

    return (
        <div className="detail-container">
            <div className="detail-pokemon-container">
                <div className="detail-pokemon">
                    <h1 className="detail-pokemon-title">{pokemon.name}</h1>
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="detail-pokemon-image"
                    />
                    <div className="detail-pokemon-info">
                        <p><strong>Height:</strong> {formatHeight(pokemon.height)}</p>
                        <p><strong>Weight:</strong> {formatWeight(pokemon.weight)}</p>
                        {/*<p><strong>Exp gain:</strong> {pokemon.base_experience}</p>*/}
                        <p><strong>Abilities:</strong><ul>
                            {pokemon.abilities.map((abilityObject, index) => (
                                <li key={index}>{abilityObject.ability.name}</li>
                            ))}
                        </ul></p>
                        <Link to="/" className="back-button">Back to List</Link>
                    </div>
                </div>
                <div className="detail-stats">
                    <h2 className="stat-title">Stats</h2>
                    <ul className="stats-list"
                        style={{ backgroundColor: getPrimaryTypeColor() }}>
                        {pokemon.stats.map((statObject, index) => {
                            const statName = statObject.stat.name;
                            const statValue = statObject.base_stat;

                            // Bereken percentage (max base stat is meestal 255)
                            const maxStat = 255;
                            const percentage = Math.min((statValue / maxStat) * 100, 100);

                            return (
                                <li className={`stat-item stat-${statName}`} key={index}>
                                    <div className="stat-label">
                                        <strong>{statName}:</strong> {statValue}
                                    </div>
                                    <div className="stat-bar-container">
                                        <div
                                            className="stat-bar"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: statColors[statName] || getPrimaryTypeColor()
                                            }}
                                        ></div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            {/**/}
            <div className="detail-chart">
                <h2 className="chart-title">Stats Grafiek</h2>
                <div style={{ width: '1000px', height: '500px', border: '1px solid red' }}>
                    <ResponsiveContainer width="100%" height="80%">
                        <BarChart
                            data={pokemon.stats.map(statObject => ({
                                name: statObject.stat.name,
                                value: statObject.base_stat,
                            }))}
                            // margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="value"
                                fill={getPrimaryTypeColor()}
                                name="Base Stat"
                                label={{ position: 'top' }}
                            />

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;