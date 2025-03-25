import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PokemonDetail from "./pages/PokemonDetail";
import { useState } from "react";

function App() {
    const [favorites, setFavorites] = useState<string[]>([]); // Voeg het type expliciet toe

    const toggleFavorite = (pokemon: string) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(pokemon)
                ? prevFavorites.filter((fav) => fav !== pokemon)
                : [...prevFavorites, pokemon]
        );
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage favorites={favorites} toggleFavorite={toggleFavorite} />
                    }
                />
                <Route path="/pokemon/:name" element={<PokemonDetail />} />
            </Routes>
        </Router>
    );
}

export default App;