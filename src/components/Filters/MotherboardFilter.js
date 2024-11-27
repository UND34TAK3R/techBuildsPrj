import React from 'react';

const MotherboardFilter = ({filters, onFilterChange, onApplyFilters, onResetFilters}) => {
    const form_factor = ["ATX", "E-ATX", "Micro-ATX", "Mini-ITX",]
    const brand = ["MSI","ASUS", "Gigabyte", "ASRock", "EVGA" ]
    const socket = ["AM4", "LGA1200", "BGA1526", "AM5", "LGA1700", "LGA 1151", "LGA 2066"  ]
    const chipset = ["Z390", "Z690", "Z490", "B550", "X470", "Z590", "B450","B360", "Z370", "B460", "X570", "H310", "A320", "H470", "H410", ]
    const memory_type = ["DDR4", "DDR5", ]

    const handleCheckBoxChange = (key, value) => {
        const newValues = filters[key]?.includes(value)
            ? filters[key].filter(v => v !== value)
            : [...(filters[key] || []), value];
        onFilterChange(key, newValues);
    };

    const handlePriceSliderChange = (min, max) => {
        onFilterChange('price', { min: Number(min), max: Number(max) });
    };

    const RamSlotsSliderChange = (min, max) => {
        onFilterChange('ram_slots', { min: Number(min), max: Number(max) });
    };

    const handleMaxMemorySliderChange = (min, max) => {
        onFilterChange('max_memory', { min: Number(min), max: Number(max) });
    };

    const handleMemorySpeedSliderChange = (min, max) => {
        onFilterChange('memory_speed', { min: Number(min), max: Number(max) });
    };

    const handleRadioChange = (key, value) => {
        onFilterChange(key, value);
    }
    

    return (
        <div className="filter-container">
            <h3>Filter Motherboards:</h3>
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
                <h4>Chipset</h4>
                {chipset.map((chipset) => (
                    <label key={chipset}>
                        <input
                            type="checkbox"
                            checked = {filters.chipset?.includes(chipset) || false}
                            onChange={() => handleCheckBoxChange("chipset", chipset)}
                        />
                        {chipset}
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
            {/* Slider for Price */}
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
            {/* Slider for Ram Slots */}
            <div>
                <h4>Memory Slots</h4>
                <input
                    type="range"
                    min="0"
                    max="4"
                    step="1"
                    value={filters.ram_slots?.max || 16}
                    onChange={(e) => RamSlotsSliderChange(filters.ram_slots?.min || 0, e.target.value)}
                />
                <span>{filters.ram_slots?.min || 0} - {Number(filters.ram_slots?.max) || 16}</span>
            </div>
            {/* Slider for Max Memory */}
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
                <span>{filters.max_memory?.min || 0} GB - {Number(filters.max_memory?.max) || 512} GB</span>
            </div>
            {/* Slider for Memory Speed */}
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
            <div>
                <h4>Bluetooth Support</h4>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.bluetooth === true}
                        onChange = {() => handleRadioChange('bluetooth', true)}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.bluetooth === false}
                        onChange = {() => handleRadioChange('bluetooth', false)}
                    />
                    No
                </label>
            </div>
            <div>
                <h4>M2 Slots</h4>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.m2_slots === true}
                        onChange = {() => handleRadioChange('m2_slots', true)}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.m2_slots === false}
                        onChange = {() => handleRadioChange('m2_slots', false)}
                    />
                    No
                </label>
            </div>
            <button onClick={onApplyFilters}>Apply</button>
            <button onClick={onResetFilters}>Reset</button>
        </div>
     );
};
export default MotherboardFilter;