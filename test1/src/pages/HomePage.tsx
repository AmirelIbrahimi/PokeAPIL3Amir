// HomePage.tsx
import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { fetchPokemon, fetchStarterSprites } from './fetchUtils';
import { Pokemon, StarterSprites } from './Types';
import SearchBar from './SearchBar';
import RegionSelector from './RegionSelector';
import PokemonList from './PokemonList';
import RegionGrid from './RegionGrid';
import regionData from './regionData';

interface HomePageProps {
    favorites: number[];
    toggleFavorite: (id: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ favorites, toggleFavorite }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [search, setSearch] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [starterSprites, setStarterSprites] = useState<StarterSprites>({});

    useEffect(() => {
        const loadData = async () => {
            const pokemonData = await fetchPokemon();
            setPokemons(pokemonData);

            const sprites = await fetchStarterSprites();
            setStarterSprites(sprites);
        };

        loadData();
    }, []);

    return (
        <div className="home-wrapper">
            <h1 className="home-title">Pokédex</h1>
            <h1 className="sub-title">Regional Pokedex Filter</h1>

            <div className="controls">
                <SearchBar search={search} setSearch={setSearch} />
                <RegionSelector selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
            </div>





            <PokemonList
                pokemons={pokemons}
                search={search}
                selectedRegion={selectedRegion}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
            />
        </div>
    );
};

export default HomePage;