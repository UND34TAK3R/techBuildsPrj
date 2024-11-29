import React, { useState } from 'react';

const RAMFilter = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
    const brand = ["Corsair", "GeIL", "G.Skill", "Kingston", "Crucial", "Patriot", "Teamgroup", "HyperX", "Ballistix", "ADATA"];
    const form_factor = ["DIMM", "SO-DIMM"];
    const memory_type = ["DDR4", "DDR5"];
    const modules = ["1x8GB", "1x16GB", "2x8GB", "2x16GB", "4x8GB"];

    const [expandedFilters, setExpandedFilters] = useState({
        brand: false,
        form_factor: false,
        memory_type: false,
        modules: false,
    });

    const handleCheckBoxChange = (key, value) => {
        const newValues = filters[key]?.includes(value)
            ? filters[key].filter(v => v !== value)
            : [...(filters[key] || []), value];
        onFilterChange(key, newValues);
    };

    const handleSliderChange = (key, min, max) => {
        onFilterChange(key, { min: Number(min), max: Number(max) });
    };

    const handleRadioChange = (key, value) => {
        onFilterChange(key, value);
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
            <h3>Filter Memory Modules:</h3>

            {/* Brand Filter */}
                <div className="text-white">
                    {renderCheckboxes('brand', brand)}
                </div>

                {/* Form Factor Filter */}
                <div className="text-white">
                    {renderCheckboxes('form_factor', form_factor)}
                </div>

                {/* Memory Type Filter */}
                <div className="text-white">
                    {renderCheckboxes('memory_type', memory_type)}
                </div>

                {/* Modules Filter */}
                <div className="text-white">
                    {renderCheckboxes('modules', modules)}
                </div>


            {/* Price Slider */}
            <div>
                <h4>Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="250"
                    value={filters.price?.max || 250}
                    onChange={(e) => handleSliderChange('price', filters.price?.min || 0, e.target.value)}
                />
                <span>{filters.price?.min || 0} $ - {Number(filters.price?.max) || 250} $</span>
            </div>

            {/* Capacity Slider */}
            <div>
                <h4>Capacity</h4>
                <input
                    type="range"
                    min="0"
                    max="32"
                    value={filters.capacity?.max || 32}
                    onChange={(e) => handleSliderChange('capacity', filters.capacity?.min || 0, e.target.value)}
                />
                <span>{filters.capacity?.min || 0} GB - {Number(filters.capacity?.max) || 32} GB</span>
            </div>

            {/* CAS Latency Slider */}
            <div>
                <h4>CAS Latency</h4>
                <input
                    type="range"
                    min="0"
                    max="22"
                    value={filters.latency?.max || 22}
                    onChange={(e) => handleSliderChange('latency', filters.latency?.min || 0, e.target.value)}
                />
                <span>{filters.latency?.min || 0} ns - {Number(filters.latency?.max) || 22} ns</span>
            </div>

            {/* Speed Slider */}
            <div>
                <h4>Speed</h4>
                <input
                    type="range"
                    min="2400"
                    max="3200"
                    value={filters.speed?.max || 3600}
                    onChange={(e) => handleSliderChange('speed', filters.speed?.min || 2400, e.target.value)}
                />
                <span>{filters.speed?.min || 2400} MHz - {Number(filters.speed?.max) || 3600} MHz</span>
            </div>

            {/* Voltage Slider */}
            <div>
                <h4>Voltage</h4>
                <input
                    type="range"
                    min="0"
                    max="5"
                    value={filters.voltage?.max || 5}
                    onChange={(e) => handleSliderChange('voltage', filters.voltage?.min || 0, e.target.value)}
                />
                <span>{filters.voltage?.min || 0} V - {Number(filters.voltage?.max) || 5} V</span>
            </div>

            {/* Heat Spreader Radio Button */}
            <div>
                <h4>Heat Spreader</h4>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.heat_spreader === true}
                        onChange={() => handleRadioChange('heat_spreader', true)}
                    />
                    Yes
                </label>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.heat_spreader === false}
                        onChange={() => handleRadioChange('heat_spreader', false)}
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

export default RAMFilter;
