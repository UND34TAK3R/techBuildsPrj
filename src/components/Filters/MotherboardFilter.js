import React, { useState } from 'react';

const MotherboardFilter = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
    const form_factor = ["ATX", "E-ATX", "Micro-ATX", "Mini-ITX"];
    const brand = ["MSI", "ASUS", "Gigabyte", "ASRock", "EVGA"];
    const socket = ["AM4", "LGA1200", "BGA1526", "AM5", "LGA1700", "LGA 1151", "LGA 2066"];
    const chipset = ["Z390", "Z690", "Z490", "B550", "X470", "Z590", "B450", "B360", "Z370", "B460", "X570", "H310", "A320", "H470", "H410"];
    const memory_type = ["DDR4", "DDR5"];

    const [expandedFilters, setExpandedFilters] = useState({
        brand: false,
        socket: false,
        form_factor: false,
        chipset: false,
        memory_type: false,
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

    const handleRamSlotsSliderChange = (min, max) => {
        onFilterChange('ram_slots', { min: Number(min), max: Number(max) });
    };

    const handleMaxMemorySliderChange = (min, max) => {
        onFilterChange('max_memory', { min: Number(min), max: Number(max) });
    };

    const handleMemorySpeedSliderChange = (min, max) => {
        onFilterChange('memory_speed', { min: Number(min), max: Number(max) });
    };

    // Handle radio button change
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
            <h3>Filter Motherboards:</h3>

        <div className='text-white'>
            {renderCheckboxes('brand', brand)}
            {renderCheckboxes('socket', socket)}
            {renderCheckboxes('form_factor', form_factor)}
            {renderCheckboxes('chipset', chipset)}
            {renderCheckboxes('memory_type', memory_type)}
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
                <span>{filters.price?.min || 0} $ - {Number(filters.price?.max) || 1000} $</span>
            </div>

            {/* Memory Slots Slider */}
            <div>
                <h4>Memory Slots</h4>
                <input
                    type="range"
                    min="0"
                    max="4"
                    step="1"
                    value={filters.ram_slots?.max || 4}
                    onChange={(e) => handleRamSlotsSliderChange(filters.ram_slots?.min || 0, e.target.value)}
                />
                <span>{filters.ram_slots?.min || 0} - {Number(filters.ram_slots?.max) || 4}</span>
            </div>

            {/* Max Memory Slider */}
            <div>
                <h4>Max Memory</h4>
                <input
                    type="range"
                    min="0"
                    max="128"
                    step="16"
                    value={filters.max_memory?.max || 128}
                    onChange={(e) => handleMaxMemorySliderChange(filters.max_memory?.min || 0, e.target.value)}
                />
                <span>{filters.max_memory?.min || 0} GB - {Number(filters.max_memory?.max) || 128} GB</span>
            </div>

            {/* Memory Speed Slider */}
            <div>
                <h4>Memory Speed</h4>
                <input
                    type="range"
                    min="0"
                    max="4000"
                    step="100"
                    value={filters.memory_speed?.max || 4000}
                    onChange={(e) => handleMemorySpeedSliderChange(filters.memory_speed?.min || 0, e.target.value)}
                />
                <span>{filters.memory_speed?.min || 0} MHz - {Number(filters.memory_speed?.max) || 4000} MHz</span>
            </div>

            {/* Bluetooth Support Radio */}
            <div>
                <h4>Bluetooth Support</h4>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.bluetooth === true}
                        onChange={() => handleRadioChange('bluetooth', true)}
                    />
                    Yes
                </label>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.bluetooth === false}
                        onChange={() => handleRadioChange('bluetooth', false)}
                    />
                    No
                </label>
            </div>

            {/* M.2 Slots Radio */}
            <div>
                <h4>M.2 Slots</h4>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.m2_slots === true}
                        onChange={() => handleRadioChange('m2_slots', true)}
                    />
                    Yes
                </label>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.m2_slots === false}
                        onChange={() => handleRadioChange('m2_slots', false)}
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

export default MotherboardFilter;
