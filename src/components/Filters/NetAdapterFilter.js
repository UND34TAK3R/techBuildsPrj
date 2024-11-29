import React, { useState } from 'react';

const NAFilter = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
    const brand = ["TP-Link", "Edimax", "Tenda", "MSI", "Huwaei", "Intel", "Netgear", "D-Link", "Linksys", "ASUS", "Gigabyte", "Zyxel"];
    const frequency_band = ["2.4 GHz", "5 GHz", "2.4 GHz and 5 GHz"];
    const adapter_type = ["USB", "PCIe"];
    const Interface = ["USB 3.0", "PCIe", "USB 2.0"];
    const wireless_standard = ["802.11n", "802.11ac", "802.11ax", "802.11g"];

    const [expandedFilters, setExpandedFilters] = useState({
        brand: false,
        frequency_band: false,
        adapter_type: false,
        Interface: false,
        wireless_standard: false,
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

    const handleMaxRangeSliderChange = (min, max) => {
        onFilterChange('max_range', { min: Number(min), max: Number(max) });
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
            <h3>Filter Network Adapters:</h3>

            {/* Brand Filter */}
            <div className="text-white">
                {renderCheckboxes('brand', brand)}
            </div>

            {/* Frequency Band Filter */}
            <div className="text-white">
                {renderCheckboxes('frequency_band', frequency_band)}
            </div>

            {/* Adapter Type Filter */}
            <div className="text-white">
                {renderCheckboxes('adapter_type', adapter_type)}
            </div>

            {/* Interface Filter */}
            <div className="text-white">
                {renderCheckboxes('Interface', Interface)}
            </div>

            {/* Wireless Standard Filter */}
            <div className="text-white">
                {renderCheckboxes('wireless_standard', wireless_standard)}
            </div>


            {/* Price Range Slider */}
            <div>
                <h4>Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="80"
                    value={filters.price?.max || 80}
                    onChange={(e) => handlePriceSliderChange(filters.price?.min || 0, e.target.value)}
                />
                <span>{filters.price?.min || 0} $ - {Number(filters.price?.max) || 80} $</span>
            </div>

            {/* Max Range Slider */}
            <div>
                <h4>Max Range</h4>
                <input
                    type="range"
                    min="0"
                    max="250"
                    value={filters.max_range?.max || 250}
                    onChange={(e) => handleMaxRangeSliderChange(filters.max_range?.min || 0, e.target.value)}
                />
                <span>{filters.max_range?.min || 0} m - {Number(filters.max_range?.max) || 250} m</span>
            </div>

            {/* Bluetooth Support Radio */}
            <div>
                <h4>Bluetooth Support</h4>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.bluetooth_support === true}
                        onChange={() => handleRadioChange('bluetooth_support', true)}
                    />
                    Yes
                </label>
                <label className='text-white'>
                    <input
                        type="radio"
                        checked={filters.bluetooth_support === false}
                        onChange={() => handleRadioChange('bluetooth_support', false)}
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

export default NAFilter;
