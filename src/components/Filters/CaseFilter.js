import React from 'react';

const CaseFilter = ({filters, onFilterChange, onApplyFilters, onResetFilters}) => {
    const brand = ["Corsair", "ASUS", "InWin", "SilverStone", "CoolerMaster", "Thermaltake", "Fractal Design", "Lian Li", "Phanteks", "NZXT", "be quiet!"]
    const color = ["Black", "White", "Gray", "Red"]
    const type = ["Mid Tower", "Micro ATX", "Full Tower"]
    const form_factor = ["ATX", "Micro-ATX"]
    const material = ["Aluminum", "Steel", "Plastic/Steel"]

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

    return (
        <div className="filter-container">
            <h3>Filter Cases:</h3>
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
                <h4>Color</h4>
                {color.map((color) => (
                    <label key={color}>
                        <input
                            type="checkbox"
                            checked = {filters.color?.includes(color) || false}
                            onChange={() => handleCheckBoxChange("color", color)}
                        />
                        {color}
                    </label>
                ))}
            </div>
            <div>
                <h4>Type</h4>
                {type.map((type) => (
                    <label key={type}>
                        <input
                            type="checkbox"
                            checked = {filters.type?.includes(type) || false}
                            onChange={() => handleCheckBoxChange("type", type)}
                        />
                        {type}
                    </label>
                ))}
            </div>
            <div>
                <h4>Motherboard Form Factor</h4>
                {form_factor.map((form_factor) => (
                    <label key={form_factor}>
                        <input
                            type="checkbox"
                            checked = {filters.form_factor?.includes(form_factor) || false}
                            onChange={() => handleCheckBoxChange("form_factor", form_factor)}
                        />
                        {form_factor}
                    </label>
                ))}
            </div>
            <div>
                <h4>Material</h4>
                {material.map((material) => (
                    <label key={material}>
                        <input
                            type="checkbox"
                            checked = {filters.material?.includes(material) || false}
                            onChange={() => handleCheckBoxChange("material", material)}
                        />
                        {material}
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
            {/* Slider for max_gpu_length */}
            <div>
                <h4>GPU Length</h4>
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
                <h4>Cooler Height</h4>
                <input
                    type="range"
                    min="0"
                    max="170"
                    value={filters.max_cooler_height?.max || 170}
                    onChange={(e) => handleCoolerHeightSliderChange(filters.max_cooler_height?.min || 0, e.target.value)}
                />
                <span>{filters.max_cooler_height?.min || 0} mm - {Number(filters.max_cooler_height?.max) || 170} mm</span>
            </div>            
            <button onClick={onApplyFilters}>Apply</button>
            <button onClick={onResetFilters}>Reset</button>
        </div>
     );
};
export default CaseFilter;