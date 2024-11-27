import React from 'react';

const NAFilter = ({filters, onFilterChange, onApplyFilters, onResetFilters}) => {
    const brand = ["TP-Link", "Edimax", "Tenda","MSI", "Huwaei", "Intel", "Netgear", "D-Link", "Linksys","ASUS", "Gigabyte", "Zyxel"]
    const frequency_band = ["2.4 GHz", "5 GHz", "2.4 GHz and 5 GHz"]
    const adapter_type = ["USB", "PCIe"]
    const Interface = ["USB 3.0","PCIe", "USB 2.0" ]
    const wireless_standard = ["802.11n", "802.11ac", "802.11ax", "802.11g"]

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
    }
    

    return (
        <div className="filter-container">
            <h3>Filter Network Adapters:</h3>
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
                <h4>Frequency Band</h4>
                {frequency_band.map((frequency) => (
                    <label key={frequency}>
                        <input
                            type="checkbox"
                            checked = {filters.frequency_band?.includes(frequency) || false}
                            onChange={() => handleCheckBoxChange("frequency_band", frequency)}
                        />
                        {frequency}
                    </label>
                ))}
            </div>

            <div>
                <h4>Adapter Type</h4>
                {adapter_type.map((adapter) => (
                    <label key={adapter}>
                        <input
                            type="checkbox"
                            checked = {filters.adapter_type?.includes(adapter) || false}
                            onChange={() => handleCheckBoxChange("adapter_type", adapter)}
                        />
                        {adapter}
                    </label>
                ))}
            </div>  

            <div>
                <h4>Interface</h4>
                {Interface.map((Interface) => (
                    <label key={Interface}>
                        <input
                            type="checkbox"
                            checked = {filters.interface?.includes(Interface) || false}
                            onChange={() => handleCheckBoxChange("interface", Interface)}
                        />
                        {Interface}
                    </label>
                ))}
            </div>

            <div>
                <h4>Wireless Standard</h4>
                {wireless_standard.map((standard) => (
                    <label key={standard}>
                        <input
                            type="checkbox"
                            checked = {filters.wireless_standard?.includes(standard) || false}
                            onChange={() => handleCheckBoxChange("wireless_standard", standard)}
                        />
                        {standard}
                    </label>
                ))}
            </div>

            {/* Slider for Price */}
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

            {/* Slider for Max Range */}
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
            <div>
                <h4>Bluetooth Support</h4>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.bluetooth_support === true}
                        onChange = {() => handleRadioChange('bluetooth_support', true)}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type = "radio"
                        checked ={filters.bluetooth_support === false}
                        onChange = {() => handleRadioChange('bluetooth_support', false)}
                    />
                    No
                </label>
            </div>
            <button onClick={onApplyFilters}>Apply</button>
            <button onClick={onResetFilters}>Reset</button>
        </div>
     );
};
export default NAFilter;