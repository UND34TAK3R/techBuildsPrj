import React from 'react';

const CPUFilter = ({filters, onFilterChange, onApplyFilters, onResetFilters}) => {
    const architecture = ["Zen 3", "Rocket Lake", "Comet Lake", "Zen 2", "Ice Lake", "Zen 4", "Alder Lake"]
    const brand = ["AMD", "Intel"]
    const socket = ["AM4", "LGA1200", "BGA1526", "AM5", "LGA1700" ]
    const generation = ["Ryzen 5000", "11th Gen", "10th Gen", "Ryzen 3000", "12th Gen", "Ryzen 7000"]

    const handleCheckBoxChange = (key, value) => {
        const newValues = filters[key]?.includes(value)
            ? filters[key].filter(v => v !== value)
            : [...(filters[key] || []), value];
        onFilterChange(key, newValues);
    };

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
    }
    

    return (
        <div className="filter-container">
            <h3>Filter CPUs:</h3>
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
                <h4>Sockets</h4>
                {socket.map((socket) => (
                    <label key={socket}>
                        <input
                            type="checkbox"
                            checked = {filters.socket?.includes(socket) || false}
                            onChange={() => handleCheckBoxChange("socket", socket)}
                        />
                        {socket}
                    </label>
                ))}
            </div>
            <div>
                <h4>Generation</h4>
                {generation.map((generation) => (
                    <label key={generation}>
                        <input
                            type="checkbox"
                            checked = {filters.generation?.includes(generation) || false}
                            onChange={() => handleCheckBoxChange("generation", generation)}
                        />
                        {generation}
                    </label>
                ))}
            </div>
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
            {/* Slider for Cores */}
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
            {/* Slider for Threads */}
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
            {/* Slider for Base Clock */}
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
            {/* Slider for Memory Bandwidth */}
            <div>
                <h4>Multi Thread Support</h4>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.multi_thread_support === true}
                        onChange = {() => handleRadioChange('multi_thread_support', true)}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.multi_thread_support === false}
                        onChange = {() => handleRadioChange('multi_thread_support', false)}
                    />
                    No
                </label>
            </div>
            <div>
                <h4>Intergrated Graphics</h4>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.integrated_graphics === true}
                        onChange = {() => handleRadioChange('integrated_graphics', true)}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.integrated_graphics === false}
                        onChange = {() => handleRadioChange('integrated_graphics', false)}
                    />
                    No
                </label>
            </div>
            <button onClick={onApplyFilters}>Apply</button>
            <button onClick={onResetFilters}>Reset</button>
        </div>
     );
};
export default CPUFilter;