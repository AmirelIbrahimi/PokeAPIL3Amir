import React from 'react'; // Toegevoegd
import ReactDOM from 'react-dom/client';
import App from './Favorite';
import './index.css'; // Optioneel: Globale CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);