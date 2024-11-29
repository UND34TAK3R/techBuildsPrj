import React, { useState } from 'react';

const CaseFilter = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
    const brand = ["Corsair", "ASUS", "InWin", "SilverStone", "CoolerMaster", "Thermaltake", "Fractal Design", "Lian Li", "Phanteks", "NZXT", "be quiet!"];
    const color = ["Black", "White", "Gray", "Red"];
    const type = ["Mid Tower", "Micro ATX", "Full Tower"];
    const form_factor = ["ATX", "Micro-ATX"];
    const material = ["Aluminum", "Steel", "Plastic/Steel"];
    
    const [expandedFilters, setExpandedFilters] = useState({
        brand: false,
        color: false,
        type: false,
        form_factor: false,
        material: false,
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

    const handleMaxGPULengthSliderChange = (min, max) => {
        onFilterChange('max_gpu_length', { min: Number(min), max: Number(max) });
    };

    const handleCoolerHeightSliderChange = (min, max) => {
        onFilterChange('max_cooler_height', { min: Number(min), max: Number(max) });
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
                <h4 style={{ color: 'white' }}>{key}</h4>
                {items.slice(0, expandedFilters[key] ? items.length : 3).map((item) => (
                    <div key={item} style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', color: 'white' }}>
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
                        style={{ color: 'white', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {expandedFilters[key] ? 'Show Less' : 'Show More'}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="filter-container">
            <h3 style={{ color: 'white' }}>Filter Cases:</h3>
            {renderCheckboxes('brand', brand)}
            {renderCheckboxes('color', color)}
            {renderCheckboxes('type', type)}
            {renderCheckboxes('form_factor', form_factor)}
            {renderCheckboxes('material', material)}
            <div>
                <h4 style={{ color: 'white' }}>Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.price?.max || 200}
                    onChange={(e) => handlePriceSliderChange(filters.price?.min || 0, e.target.value)}
                />
                <span>{filters.price?.min || 0} $ - {Number(filters.price?.max) || 200} $</span>
            </div>
            {/* Slider for max_gpu_length */}
            <div>
                <h4 style={{ color: 'white' }}>GPU Length</h4>
                <input
                    type="range"
                    min="0"
                    max="420"
                    value={filters.max_gpu_length?.max || 420}
                    onChange={(e) => handleMaxGPULengthSliderChange(filters.max_gpu_length?.min || 0, e.target.value)}
                />
                <span>{filters.max_gpu_length?.min || 0} mm - {Number(filters.max_gpu_length?.max) || 420} mm</span>
            </div>
            {/* Slider for Threads */}
            <div>
                <h4 style={{ color: 'white' }}>Cooler Height</h4>
                <input
                    type="range"
                    min="0"
                    max="170"
                    value={filters.max_cooler_height?.max || 170}
                    onChange={(e) => handleCoolerHeightSliderChange(filters.max_cooler_height?.min || 0, e.target.value)}
                />
                <span>{filters.max_cooler_height?.min || 0} mm - {Number(filters.max_cooler_height?.max) || 170} mm</span>
            </div>
            <button className='btn btn-outline-light me-2' onClick={onApplyFilters} style={{ marginTop: '10px' }}>Apply</button>
            <button className='btn btn-outline-danger' onClick={onResetFilters} style={{ marginTop: '10px' }}>Reset</button>
        </div>
    );
};

export default CaseFilter;
