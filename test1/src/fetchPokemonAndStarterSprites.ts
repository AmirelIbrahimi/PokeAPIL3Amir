// fetchUtils.ts
import { regionData } from './regionData';
import type { Pokemon, StarterSprites } from './types';

export const fetchPokemon = async (): Promise<Pokemon[]> => {
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
            };
        })
    );

    return pokemonDetails;
};

export const fetchStarterSprites = async (): Promise<StarterSprites> => {
    const sprites: StarterSprites = {};

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
                sprites[region].push(null); // Placeholder
            }
        }
    }

    return sprites;
};