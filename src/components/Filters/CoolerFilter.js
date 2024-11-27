import React from 'react';

const CoolerFilter = ({filters, onFilterChange, onApplyFilters, onResetFilters}) => {
    const brand = ["Cooler Master","NZXT","Deepcool", "Arctic", "Be Quiet!", "Thermaltake", "Corsair", "Noctua", "Phanteks", "NZXT", "be quiet!"]
    const cooler_type = ["Air Cooler", "Liquid Cooler"]

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

    return (
        <div className="filter-container">
            <h3>Filter Coolers:</h3>
            <div>
                <h4>Manufacturer</h4>
                {brand.map((brand) => (
                    <label key={brand}>
                        <input
                            type="checkbox"
                            checked = {filters.brand?.includes(brand) || false}
                            onChange={() => handleCheckBoxChange("brand", brand)}
                        />
                        {brand}
                    </label>
                ))}
            </div>
            <div>
                <h4>Type</h4>
                {cooler_type.map((cooler_type) => (
                    <label key={cooler_type}>
                        <input
                            type="checkbox"
                            checked = {filters.cooler_type?.includes(cooler_type) || false}
                            onChange={() => handleCheckBoxChange("cooler_type", cooler_type)}
                        />
                        {cooler_type}
                    </label>
                ))}
            </div>
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
            <button onClick={onApplyFilters}>Apply</button>
            <button onClick={onResetFilters}>Reset</button>
        </div>
     );
};
export default CoolerFilter;