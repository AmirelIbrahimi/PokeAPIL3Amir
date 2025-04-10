// RegionGrid.tsx
import React from 'react';
import regionData from './regionData';
import './HomePage.scss';

interface RegionGridProps {
    selectedRegion: string;
    setSelectedRegion: (region: string) => void;
    starterSprites: Record<string, (string | null)[]>;
}

const RegionGrid: React.FC<RegionGridProps> = ({ selectedRegion, setSelectedRegion, starterSprites }) => {
    const handleRegionFilter = (region: string) => {
        setSelectedRegion(selectedRegion === region ? '' : region);
    };

    return (
        <div className="category-container">
            {Object.keys(regionData).map((region) => (
                <div
                    key={region}
                    className={`category-item ${selectedRegion === region ? 'selected' : ''}`}
                    onClick={() => handleRegionFilter(region)}
                >
                    <div className="region-name">{region}</div>
                    <div className="starter-sprites">
                        {starterSprites[region]?.map((sprite, index) =>
                            sprite ? (
                                <img
                                    key={index}
                                    src={sprite}
                                    alt={`${region} starter ${index}`}
                                    className="starter-sprite"
                                />
                            ) : null
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RegionGrid;
