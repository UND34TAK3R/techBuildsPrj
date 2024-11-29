import React from 'react';

const StorageFilter = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
    const brand = ["Samsung", "Kingston", "Seagate", "Team Group", "ADATA", "Toshiba", "Western Digital", "Corsair", "Crucial"];
    const form_factor = ["M.2", "2.5 inch", "3.5 inch"];
    const Interface = ["NVMe", "SATA"];
    const storage_type = ["SSD", "HDD"];

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

    const handleCacheSliderChange = (min, max) => {
        onFilterChange('cache', { min: Number(min), max: Number(max) });
    };

    return (
        <div className="filter-container">
            <h3>Filter Storage Devices:</h3>

            <div>
                <h4>Manufacturer</h4>
                {brand.map((brand) => (
                    <label className='text-white' key={brand}>
                        <input
                            type="checkbox"
                            checked={filters.brand?.includes(brand) || false}
                            onChange={() => handleCheckBoxChange("brand", brand)}
                        />
                        {brand}
                    </label>
                ))}
            </div>

            <div>
                <h4>Form Factor</h4>
                {form_factor.map((form_factor) => (
                    <label className='text-white' key={form_factor}>
                        <input
                            type="checkbox"
                            checked={filters.form_factor?.includes(form_factor) || false}
                            onChange={() => handleCheckBoxChange("form_factor", form_factor)}
                        />
                        {form_factor}
                    </label>
                ))}
            </div>

            <div>
                <h4>Storage Type</h4>
                {storage_type.map((storage_type) => (
                    <label className='text-white' key={storage_type}>
                        <input
                            type="checkbox"
                            checked={filters.storage_type?.includes(storage_type) || false}
                            onChange={() => handleCheckBoxChange("storage_type", storage_type)}
                        />
                        {storage_type}
                    </label>
                ))}
            </div>

            <div>
                <h4>Interface</h4>
                {Interface.map((Interface) => (
                    <label className='text-white' key={Interface}>
                        <input
                            type="checkbox"
                            checked={filters.interface?.includes(Interface) || false}
                            onChange={() => handleCheckBoxChange("interface", Interface)}
                        />
                        {Interface}
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
                    max="5000"
                    value={filters.capacity?.max || 5000}
                    onChange={(e) => handleCapacitySliderChange(filters.capacity?.min || 0, e.target.value)}
                />
                <span>{filters.capacity?.min || 0} GB - {Number(filters.capacity?.max) || 5000} GB</span>
            </div>

            <div>
                <h4>Cache</h4>
                <input
                    type="range"
                    min="0"
                    max="512"
                    value={filters.cache?.max || 512}
                    onChange={(e) => handleCacheSliderChange(filters.cache?.min || 0, e.target.value)}
                />
                <span>{filters.cache?.min || 0} MB - {Number(filters.cache?.max) || 512} MB</span>
            </div>

            <button className='btn btn-outline-light  me-2'  onClick={onApplyFilters}>Apply</button>
            <button className='btn btn-outline-danger' onClick={onResetFilters}>Reset</button>
        </div>
    );
};

export default StorageFilter;
