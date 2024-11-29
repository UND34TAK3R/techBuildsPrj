import React, { useState } from 'react';

const CoolerFilter = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
    const brand = ["Cooler Master", "NZXT", "Deepcool", "Arctic", "Be Quiet!", "Thermaltake", "Corsair", "Noctua", "Phanteks", "NZXT", "be quiet!"];
    const cooler_type = ["Air Cooler", "Liquid Cooler"];

    const [expandedFilters, setExpandedFilters] = useState({
        brand: false,
        cooler_type: false,
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

    const handleFanHeightSliderChange = (min, max) => {
        onFilterChange('fan_height', { min: Number(min), max: Number(max) });
    };

    // Toggle expand/collapse for filter options
    const toggleExpand = (filter) => {
        setExpandedFilters(prevState => ({
            ...prevState,
            [filter]: !prevState[filter],
        }));
    };

    // Render checkboxes for any filter category
    const renderCheckboxes = (key, items) => {
        return (
            <div>
                <h4>{key}</h4>
                {items.slice(0, expandedFilters[key] ? items.length : 3).map((item) => (
                    <div key={item}>
                        <label className='text-white'>
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
            <h3>Filter Coolers:</h3>

            <div className='text-white'>

                {/* Manufacturer Filter */}
                {renderCheckboxes('brand', brand)}

                {/* Type Filter */}
                {renderCheckboxes('cooler_type', cooler_type)}

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

            {/* Cooler Height Slider */}
            <div>
                <h4>Cooler Height</h4>
                <input
                    type="range"
                    min="0"
                    max="170"
                    value={filters.fan_height?.max || 170}
                    onChange={(e) => handleFanHeightSliderChange(filters.fan_height?.min || 0, e.target.value)}
                />
                <span>{filters.fan_height?.min || 0} mm - {Number(filters.fan_height?.max) || 170} mm</span>
            </div>

            {/* Apply and Reset Buttons */}
            <button className='btn btn-outline-light me-2' onClick={onApplyFilters} style={{ marginTop: '10px' }}>Apply</button>
            <button className='btn btn-outline-danger' onClick={onResetFilters} style={{ marginTop: '10px' }}>Reset</button>
        </div>
    );
};

export default CoolerFilter;
