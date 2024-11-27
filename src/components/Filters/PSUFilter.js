import React from 'react';

const PSUFilter = ({filters, onFilterChange, onApplyFilters, onResetFilters}) => {
    const brand = ["Corsair", "FSP", "InWin", "SilverStone", "HP", "Zalman", "Thermaltake", "Fractal Design", "Enermax", "Rosewill", "Seasonic", "Phanteks", "Cooler Master", "ASUS", "XPG", "Lian Li", "Cougar", "Deepcool", "BitFenix", "EVGA", "AeroCool", "GameMax", "Antec", "be quiet!", "XFX", "Gigabyte"]
    const form_factor = ["ATX", "SFX", "Flex ATX", "Mini-ITX", "TFX"]
    const efficiency_rating = ["80 Plus Gold", "80 Plus Platinum", "80 Plus Bronze", "80 Plus Silver"]
    const modularity = ["Fully Modular", "Partially Modular", "Non-Modular"]
    

    const handleCheckBoxChange = (key, value) => {
        const newValues = filters[key]?.includes(value)
            ? filters[key].filter(v => v !== value)
            : [...(filters[key] || []), value];
        onFilterChange(key, newValues);
    };

    const handlePriceSliderChange = (min, max) => {
        onFilterChange('price', { min: Number(min), max: Number(max) });
    };

    const handleWattageSliderChange = (min, max) => {
        onFilterChange('wattage', { min: Number(min), max: Number(max) });
    };

    return (
        <div className="filter-container">
            <h3>Filter Power Supplies:</h3>
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
                <h4>Efficiency Rating</h4>
                {efficiency_rating.map((efficiency_rating) => (
                    <label key={efficiency_rating}>
                        <input
                            type="checkbox"
                            checked = {filters.efficiency_rating?.includes(efficiency_rating) || false}
                            onChange={() => handleCheckBoxChange("efficiency_rating", efficiency_rating)}
                        />
                        {efficiency_rating}
                    </label>
                ))}
            </div>
            <div>
                <h4>Modularity</h4>
                {modularity.map((modularity) => (
                    <label key={modularity}>
                        <input
                            type="checkbox"
                            checked = {filters.modularity?.includes(modularity) || false}
                            onChange={() => handleCheckBoxChange("modularity", modularity)}
                        />
                        {modularity}
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
                <span>{filters.price?.min || 0}  $- {Number(filters.price?.max) || 200} $</span>
            </div>
            <div>
                <h4>Wattage</h4>
                <input
                    type="range"
                    min="0"
                    max="850"
                    value={filters.wattage?.max || 850}
                    onChange={(e) => handleWattageSliderChange(filters.wattage?.min || 0, e.target.value)}
                />
                <span>{filters.wattage?.min || 0} W - {Number(filters.wattage?.max) || 850} W</span>
            </div>            
            <button onClick={onApplyFilters}>Apply</button>
            <button onClick={onResetFilters}>Reset</button>
        </div>
     );
};
export default PSUFilter;