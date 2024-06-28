import Data from '../dataset.json';

export const fetchData = async () => {
    console.log("Dataset fetched:", Data); // Debug log

    const aggregatedData = aggregateData(Data);
    console.log("Aggregated data:", aggregatedData); // Debug log
    return aggregatedData;
};

const aggregateData = (data) => {
    const result = {};

    data.forEach(row => {
        const year = row['Year'];
        const crop = row['Crop Name']; // Adjusted to match your dataset structure
        const production = parseFloat(row['Crop Production (UOM:t(Tonnes))']) || 0; // Adjusted key to match your dataset

        if (!result[year]) {
            result[year] = { maxCrop: crop, minCrop: crop, maxProduction: production, minProduction: production };
        } else {
            if (production > result[year].maxProduction) {
                result[year].maxCrop = crop;
                result[year].maxProduction = production;
            }
            if (production < result[year].minProduction) {
                result[year].minCrop = crop;
                result[year].minProduction = production;
            }
        }
    });

    return Object.entries(result).map(([year, { maxCrop, minCrop }]) => ({
        year,
        maxCrop,
        minCrop,
    }));
};
