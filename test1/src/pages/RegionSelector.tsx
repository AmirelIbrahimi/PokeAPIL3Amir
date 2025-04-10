// RegionSelector.tsx
import React from 'react';
import { regionData } from './regionData';  // Correcte import voor een named export


interface RegionSelectorProps {
    selectedRegion: string;
    setSelectedRegion: (region: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, setSelectedRegion }) => {
    return (
        <div className="region-selector">
            <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
            >
                <option value="">Alle regio's</option>
                {Object.keys(regionData).map((region) => (
                    <option key={region} value={region}>
                        {region}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RegionSelector;