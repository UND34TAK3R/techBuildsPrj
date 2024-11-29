import React, { useState } from 'react';

const CPUFilter = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
    const architecture = ["Zen 3", "Rocket Lake", "Comet Lake", "Zen 2", "Ice Lake", "Zen 4", "Alder Lake"];
    const brand = ["AMD", "Intel"];
    const socket = ["AM4", "LGA1200", "BGA1526", "AM5", "LGA1700"];
    const generation = ["Ryzen 5000", "11th Gen", "10th Gen", "Ryzen 3000", "12th Gen", "Ryzen 7000"];

    const [expandedFilters, setExpandedFilters] = useState({
        architecture: false,
        brand: false,
        socket: false,
        generation: false,
    });

    // Handle checkbox change
    const handleCheckBoxChange = (key, value) => {
        const newValues = filters[key]?.includes(value)
            ? filters[key].filter(v => v !== value)
            : [...(filters[key] || []), value];
        onFilterChange(key, newValues);
    };

    // Handle slider change
    const handlePriceSliderChange = (min, max) => {
        onFilterChange('price', { min: Number(min), max: Number(max) });
    };

    const handleCoresSliderChange = (min, max) => {
        onFilterChange('cores', { min: Number(min), max: Number(max) });
    };

    const handleThreadsSliderChange = (min, max) => {
        onFilterChange('threads', { min: Number(min), max: Number(max) });
    };

    const handleBaseClockSliderChange = (min, max) => {
        onFilterChange('base_clock', { min: Number(min), max: Number(max) });
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
            <h3>Filter CPUs:</h3>
        <div className='text-white'>
            {/* Architecture Filter */}
            {renderCheckboxes('architecture', architecture)}

            {/* Manufacturer Filter */}
            {renderCheckboxes('brand', brand)}

            {/* Socket Filter */}
            {renderCheckboxes('socket', socket)}

            {/* Generation Filter */}
            {renderCheckboxes('generation', generation)}
        </div>

            {/* Price Range Slider */}
            <div>
                <h4>Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={filters.price?.max || 1000}
                    onChange={(e) => handlePriceSliderChange(filters.price?.min || 0, e.target.value)}
                />
                <span>{filters.price?.min || 0} - {Number(filters.price?.max) || 1000}</span>
            </div>

            {/* Cores Slider */}
            <div>
                <h4>Cores</h4>
                <input
                    type="range"
                    min="2"
                    max="16"
                    step="2"
                    value={filters.cores?.max || 16}
                    onChange={(e) => handleCoresSliderChange(filters.cores?.min || 2, e.target.value)}
                />
                <span>{filters.cores?.min || 2} - {Number(filters.cores?.max) || 16}</span>
            </div>

            {/* Threads Slider */}
            <div>
                <h4>Threads</h4>
                <input
                    type="range"
                    min="4"
                    max="32"
                    step="2"
                    value={filters.threads?.max || 32}
                    onChange={(e) => handleThreadsSliderChange(filters.threads?.min || 4, e.target.value)}
                />
                <span>{filters.threads?.min || 4} - {Number(filters.threads?.max) || 32}</span>
            </div>

            {/* Base Clock Slider */}
            <div>
                <h4>Performance Core Clock</h4>
                <input
                    type="range"
                    min="1.1"
                    max="4.7"
                    step="0.1"
                    value={filters.base_clock?.max || 4.7}
                    onChange={(e) => handleBaseClockSliderChange(filters.base_clock?.min || 1.1, e.target.value)}
                />
                <span>{filters.base_clock?.min || 1.1} GHz - {Number(filters.base_clock?.max) || 4.7} GHz</span>
            </div>

            {/* Multi Thread Support Radio */}
            <div>
                <h4>Multi Thread Support</h4>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.multi_thread_support === true}
                        onChange={() => handleRadioChange('multi_thread_support', true)}
                    />
                    Yes
                </label>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.multi_thread_support === false}
                        onChange={() => handleRadioChange('multi_thread_support', false)}
                    />
                    No
                </label>
            </div>

            {/* Integrated Graphics Radio */}
            <div>
                <h4>Integrated Graphics</h4>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.integrated_graphics === true}
                        onChange={() => handleRadioChange('integrated_graphics', true)}
                    />
                    Yes
                </label>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.integrated_graphics === false}
                        onChange={() => handleRadioChange('integrated_graphics', false)}
                    />
                    No
                </label>
            </div>

            {/* Apply and Reset Buttons */}
            <button className='btn btn-outline-light me-2' onClick={onApplyFilters}>Apply</button>
            <button className='btn btn-outline-danger' onClick={onResetFilters}>Reset</button>
        </div>
    );
};

export default CPUFilter;
