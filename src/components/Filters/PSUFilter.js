import React, { useState } from 'react';

const PSUFilter = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
    const brand = ["Corsair", "FSP", "InWin", "SilverStone", "HP", "Zalman", "Thermaltake", "Fractal Design", "Enermax", "Rosewill", "Seasonic", "Phanteks", "Cooler Master", "ASUS", "XPG", "Lian Li", "Cougar", "Deepcool", "BitFenix", "EVGA", "AeroCool", "GameMax", "Antec", "be quiet!", "XFX", "Gigabyte"];
    const form_factor = ["ATX", "SFX", "Flex ATX", "Mini-ITX", "TFX"];
    const efficiency_rating = ["80 Plus Gold", "80 Plus Platinum", "80 Plus Bronze", "80 Plus Silver"];
    const modularity = ["Fully Modular", "Partially Modular", "Non-Modular"];

    const [expandedFilters, setExpandedFilters] = useState({
        brand: false,
        form_factor: false,
        efficiency_rating: false,
        modularity: false,
    });

    const handleCheckBoxChange = (key, value) => {
        const newValues = filters[key]?.includes(value)
            ? filters[key].filter(v => v !== value)
            : [...(filters[key] || []), value];
        onFilterChange(key, newValues);
    };

    const handlePriceSliderChange = (min, max) => {
        onFilterChange('price', { min: Number(min), max: Number(max) });
    };

    const handleWattageSliderChange = (min, max) => {
        onFilterChange('wattage', { min: Number(min), max: Number(max) });
    };

    const toggleExpand = (filter) => {
        setExpandedFilters(prevState => ({
            ...prevState,
            [filter]: !prevState[filter],
        }));
    };

    const renderCheckboxes = (key, items) => {
        return (
            <div>
                <h4>{key}</h4>
                {items.slice(0, expandedFilters[key] ? items.length : 3).map((item) => (
                    <div key={item}>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters[key]?.includes(item) || false}
                                onChange={() => handleCheckBoxChange(key, item)}
                            />
                            {item}
                        </label>
                    </div>
                ))}
                {items.length > 3 && (
                    <span
                        onClick={() => toggleExpand(key)}
                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {expandedFilters[key] ? 'Show Less' : 'Show More'}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="filter-container">
            <h3>Filter Power Supplies:</h3>

           {/* Brand Filter */}
            <div className="text-white">
                {renderCheckboxes('brand', brand)}
            </div>

            {/* Form Factor Filter */}
            <div className="text-white">
                {renderCheckboxes('form_factor', form_factor)}
            </div>

            {/* Efficiency Rating Filter */}
            <div className="text-white">
                {renderCheckboxes('efficiency_rating', efficiency_rating)}
            </div>

            {/* Modularity Filter */}
            <div className="text-white">
                {renderCheckboxes('modularity', modularity)}
            </div>


            {/* Price Range Slider */}
            <div>
                <h4>Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.price?.max || 200}
                    onChange={(e) => handlePriceSliderChange(filters.price?.min || 0, e.target.value)}
                />
                <span>{filters.price?.min || 0} $ - {Number(filters.price?.max) || 200} $</span>
            </div>

            {/* Wattage Slider */}
            <div>
                <h4>Wattage</h4>
                <input
                    type="range"
                    min="0"
                    max="850"
                    value={filters.wattage?.max || 850}
                    onChange={(e) => handleWattageSliderChange(filters.wattage?.min || 0, e.target.value)}
                />
                <span>{filters.wattage?.min || 0} W - {Number(filters.wattage?.max) || 850} W</span>
            </div>

            {/* Apply and Reset Buttons */}
            <button className='btn btn-outline-light me-2' onClick={onApplyFilters}>Apply</button>
            <button className='btn btn-outline-danger' onClick={onResetFilters}>Reset</button>
        </div>
    );
};

export default PSUFilter;
