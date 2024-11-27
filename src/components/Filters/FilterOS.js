import React from 'react';

const OSFilter = ({filters, onFilterChange, onApplyFilters, onResetFilters}) => {
    const name = ["Windows 10", "Windows 11","Windows 8", "Linux", "Mac OS"]
    const architecture = ["x86", "x64"]
    

    const handleCheckBoxChange = (key, value) => {
        const newValues = filters[key]?.includes(value)
            ? filters[key].filter(v => v !== value)
            : [...(filters[key] || []), value];
        onFilterChange(key, newValues);
    };

    const handlePriceSliderChange = (min, max) => {
        onFilterChange('price', { min: Number(min), max: Number(max) });
    };

    return (
        <div className="filter-container">
            <h3>Filter Operating Systems:</h3>
            <div>
                <h4>Name</h4>
                {name.map((name) => (
                    <label key={name}>
                        <input
                            type="checkbox"
                            checked = {filters.name?.includes(name) || false}
                            onChange={() => handleCheckBoxChange("name", name)}
                        />
                        {name}
                    </label>
                ))}
            </div>
            <div>
                <h4>Architecture</h4>
                {architecture.map((architecture) => (
                    <label key={architecture}>
                        <input
                            type="checkbox"
                            checked = {filters.architecture?.includes(architecture) || false}
                            onChange={() => handleCheckBoxChange("architecture", architecture)}
                        />
                        {architecture}
                    </label>
                ))}
            </div>
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
                <span>{filters.price?.min || 100}  $- {Number(filters.price?.max) || 1000} $</span>
            </div>
            <button onClick={onApplyFilters}>Apply</button>
            <button onClick={onResetFilters}>Reset</button>
        </div>
     );
};
export default OSFilter;