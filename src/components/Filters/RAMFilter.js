import React from 'react';

const RAMFilter = ({filters, onFilterChange, onApplyFilters, onResetFilters}) => {
    const brand = ["Corsair", "GeIL", "G.Skill", "Kingston","Crucial", "Patriot", "Teamgroup","HyperX", "Ballistix", "ADATA",    ]
    const form_factor = ["DIMM", "SO-DIMM"]
    const memory_type = ["DDR4", "DDR5"]
    const modules = ["1x8GB", "1x16GB", "2x8GB", "2x16GB", "4x8GB"]

    const handleCheckBoxChange = (key, value) => {
        const newValues = filters[key]?.includes(value)
            ? filters[key].filter(v => v !== value)
            : [...(filters[key] || []), value];
        onFilterChange(key, newValues);
    };

    const handlePriceSliderChange = (min, max) => {
        onFilterChange('price', { min: Number(min), max: Number(max) });
    };

    const handleCapacitySliderChange = (min, max) => {
        onFilterChange('capacity', { min: Number(min), max: Number(max) });
    };

    const handleLatencySliderChange = (min, max) => {
        onFilterChange('latency', { min: Number(min), max: Number(max) });
    };

    const handleSpeedSliderChange = (min, max) => {
        onFilterChange('speed', { min: Number(min), max: Number(max) });
    };

    const handleVoltageSliderChange = (min, max) => {
        onFilterChange('voltage', { min: Number(min), max: Number(max) });
    };

    const handleRadioChange = (key, value) => {
        onFilterChange(key, value);
    }
    

    return (
        <div className="filter-container">
            <h3>Filter Memory Modules:</h3>
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
                <h4>Form Factor</h4>
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
                <h4>Memory Type</h4>
                {memory_type.map((memory_type) => (
                    <label key={memory_type}>
                        <input
                            type="checkbox"
                            checked = {filters.memory_type?.includes(memory_type) || false}
                            onChange={() => handleCheckBoxChange("memory_type", memory_type)}
                        />
                        {memory_type}
                    </label>
                ))}
            </div>

            <div>
                <h4>Modules</h4>
                {modules.map((modules) => (
                    <label key={modules}>
                        <input
                            type="checkbox"
                            checked = {filters.modules?.includes(modules) || false}
                            onChange={() => handleCheckBoxChange("modules", modules)}
                        />
                        {modules}
                    </label>
                ))}
            </div>

            {/* Slider for Price */}
            <div>
                <h4>Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="250"
                    value={filters.price?.max || 250}
                    onChange={(e) => handlePriceSliderChange(filters.price?.min || 0, e.target.value)}
                />
                <span>{filters.price?.min || 0} $ - {Number(filters.price?.max) || 250} $</span>
            </div> 
            <div>
                <h4>Capacity</h4>
                <input
                    type="range"
                    min="0"
                    max="32"
                    value={filters.capacity?.max || 32}
                    onChange={(e) => handleCapacitySliderChange(filters.capacity?.min || 0, e.target.value)}
                />
                <span>{filters.capacity?.min || 0} GB - {Number(filters.capacity?.max) || 32} GB</span>
            </div>     
            <div>
                <h4>CAS Latency</h4>
                <input
                    type="range"
                    min="0"
                    max="22"
                    value={filters.latency?.max || 22}
                    onChange={(e) => handleLatencySliderChange(filters.latency?.min || 0, e.target.value)}
                />
                <span>{filters.latency?.min || 0} ns - {Number(filters.latency?.max) || 22} ns</span>
            </div>
            <div>
                <h4>Speed</h4>
                <input
                    type="range"
                    min="2400"
                    max="3200"
                    value={filters.speed?.max || 3600}
                    onChange={(e) => handleSpeedSliderChange(filters.speed?.min || 2400, e.target.value)}
                />
                <span>{filters.speed?.min || 2400} MHz - {Number(filters.speed?.max) || 3600} MHz</span>
            </div>  
            <div>
                <h4>Voltage</h4>
                <input
                    type="range"
                    min="0"
                    max="5"
                    value={filters.voltage?.max || 5}
                    onChange={(e) => handleVoltageSliderChange(filters.voltage?.min || 0, e.target.value)}
                />
                <span>{filters.voltage?.min || 0} V - {Number(filters.voltage?.max) || 5} V</span>
            </div>                   
            <div>
                <h4>Heat Spreader</h4>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.heat_spreader === true}
                        onChange = {() => handleRadioChange('heat_spreader', true)}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.heat_spreader === false}
                        onChange = {() => handleRadioChange('heat_spreader', false)}
                    />
                    No
                </label>
            </div>
            <button onClick={onApplyFilters}>Apply</button>
            <button onClick={onResetFilters}>Reset</button>
        </div>
     );
};
export default RAMFilter;