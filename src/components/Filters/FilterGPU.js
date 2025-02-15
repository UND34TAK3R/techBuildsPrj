import React, { useState } from 'react';

const GPUFilter = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
    const [expandedFilters, setExpandedFilters] = useState({
        brand: false,
        chipset: false,
        memory_type: false,
    });

    const brand = ["NVIDIA", "AMD"];
    const chipset = [
        "GeForce RTX 3080", "GeForce RTX 2080 Super", "Radeon RX 5500 XT", "GeForce RTX 1650 Super", "Radeon RX 5600 XT", 
        "GeForce GTX 1080 Ti", "Radeon RX 6700", "GeForce GTX 1070", "GeForce GTX 1060", "Radeon VII", "GeForce RTX 2080", 
        "Radeon RX 6800 XT", "Radeon RX 5800", "GeForce RTX 3070 Ti", "Radeon RX 6700 XT", "GeForce GTX 1660 Super", 
        "Radeon RX 5600", "GeForce RTX 3050", "Radeon RX 5500", "GeForce RTX 3060", "Radeon RX 6600", "GeForce GTX 980 Ti", 
        "GeForce RTX 3070", "Radeon RX 470", "GeForce GTX 750 Ti", "Radeon RX 6900 XT", "GeForce GTX 1660 Ti", 
        "GeForce RTX 3060 Ti", "Radeon RX 6700 XT", "GeForce RTX 3090", "Radeon RX 6600 XT"
    ];
    const memory_type = ["GDDR6X", "GDDR6", "GDDR5X", "GDDR5", "HBM2"];

    const handleCheckBoxChange = (key, value) => {
        const newValues = filters[key]?.includes(value)
            ? filters[key].filter(v => v !== value)
            : [...(filters[key] || []), value];
        onFilterChange(key, newValues);
    };

    const handlePriceSliderChange = (min, max) => {
        onFilterChange('price', { min: Number(min), max: Number(max) });
    };

    const BoostClockSliderChange = (min, max) => {
        onFilterChange('boost_clock', { min: Number(min), max: Number(max) });
    };

    const handleCoreClockSliderChange = (min, max) => {
        onFilterChange('core_clock', { min: Number(min), max: Number(max) });
    };

    const handleLenghtSliderChange = (min, max) => {
        onFilterChange('length', { min: Number(min), max: Number(max) });
    };

    const handleMemorySizeSliderChange = (min, max) => {
        onFilterChange('memory_size', { min: Number(min), max: Number(max) });
    };

    const handleRadioChange = (key, value) => {
        onFilterChange(key, value);
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
                    <div className='text-white' key={item}>
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
            <h3>Filter GPUs:</h3>
        <div className='text-white'>
            {/* Manufacturer Filter */}
            {renderCheckboxes('brand', brand)}

            {/* Chipset Filter */}
            {renderCheckboxes('chipset', chipset)}

            {/* Memory Type Filter */}
            {renderCheckboxes('memory_type', memory_type)}
        </div>

            {/* Price Range Slider */}
            <div>
                <h4>Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={filters.price?.max || 2000}
                    onChange={(e) => handlePriceSliderChange(filters.price?.min || 0, e.target.value)}
                />
                <span>{filters.price?.min || 0} $ - {Number(filters.price?.max) || 2000} $</span>
            </div>

            {/* Boost Clock Slider */}
            <div>
                <h4>Boost Clock</h4>
                <input
                    type="range"
                    min="0"
                    max="2855"
                    step="1"
                    value={filters.boost_clock?.max || 2855}
                    onChange={(e) => BoostClockSliderChange(filters.boost_clock?.min || 0, e.target.value)}
                />
                <span>{filters.boost_clock?.min || 0} Mhz - {Number(filters.boost_clock?.max) || 2855} Mhz</span>
            </div>

            {/* Core Clock Slider */}
            <div>
                <h4>Core Clock</h4>
                <input
                    type="range"
                    min="0"
                    max="2670"
                    step="1"
                    value={filters.core_clock?.max || 2670}
                    onChange={(e) => handleCoreClockSliderChange(filters.core_clock?.min || 0, e.target.value)}
                />
                <span>{filters.core_clock?.min || 0} Mhz - {Number(filters.core_clock?.max) || 2670} Mhz</span>
            </div>

            {/* Length Slider */}
            <div>
                <h4>Length</h4>
                <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={filters.length?.max || 360}
                    onChange={(e) => handleLenghtSliderChange(filters.length?.min || 0, e.target.value)}
                />
                <span>{filters.length?.min || 0} mm - {Number(filters.length?.max) || 360} mm</span>
            </div>

            {/* Memory Size Slider */}
            <div>
                <h4>Memory Size</h4>
                <input
                    type="range"
                    min="0"
                    max="48"
                    step="1"
                    value={filters.memory_size?.max || 48}
                    onChange={(e) => handleMemorySizeSliderChange(filters.memory_size?.min || 0, e.target.value)}
                />
                <span>{filters.memory_size?.min || 0} GB - {Number(filters.memory_size?.max) || 48} GB</span>
            </div>

            {/* Ray Tracing Filter */}
            <div>
                <h4>Ray Tracing</h4>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.ray_tracing === true}
                        onChange={() => handleRadioChange('ray_tracing', true)}
                    />
                    Yes
                </label>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.ray_tracing === false}
                        onChange={() => handleRadioChange('ray_tracing', false)}
                    />
                    No
                </label>
            </div>

            <button className='btn btn-outline-light me-2' onClick={onApplyFilters}>Apply</button>
            <button className='btn btn-outline-danger' onClick={onResetFilters}>Reset</button>
        </div>
    );
};

export default GPUFilter;
