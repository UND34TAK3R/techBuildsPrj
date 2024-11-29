import React, { useState } from 'react';

const OSFilter = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
    const name = ["Windows 10", "Windows 11", "Windows 8", "Linux", "Mac OS"];
    const architecture = ["x86", "x64"];

    const [expandedFilters, setExpandedFilters] = useState({
        name: false,
        architecture: false,
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
            <h3>Filter Operating Systems:</h3>
        <div className='text-white'>
            {/* Name Filter */}
            {renderCheckboxes('name', name)}

            {/* Architecture Filter */}
            {renderCheckboxes('architecture', architecture)}
        </div>
            {/* Price Range Slider */}
            <div>
                <h4>Price Range</h4>
                <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={filters.price?.max || 1000}
                    onChange={(e) => handlePriceSliderChange(filters.price?.min || 100, e.target.value)}
                />
                <span>{filters.price?.min || 100} $ - {Number(filters.price?.max) || 1000} $</span>
            </div>

            {/* Apply and Reset Buttons */}
            <button className='btn btn-outline-light me-2' onClick={onApplyFilters}>Apply</button>
            <button className='btn btn-outline-danger' onClick={onResetFilters}>Reset</button>
        </div>
    );
};

export default OSFilter;
