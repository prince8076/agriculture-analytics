import Data from '../dataset.json';

export const fetchData = async () => {
    console.log("Dataset fetched:", Data); // Debug log

    const aggregatedData = aggregateData(Data);
    const averageData = calculateAverages(Data);

    console.log("Aggregated data:", aggregatedData); // Debug log
    console.log("Average data:", averageData); // Debug log

    return { aggregatedData, averageData };
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

const calculateAverages = (data) => {
    const cropData = {};

    // Initialize counters and accumulators
    const count = {};
    const yieldSum = {};
    const areaSum = {};

    // Iterate through data to accumulate yield and area data
    data.forEach(row => {
        const crop = row['Crop Name'];
        const yieldValue = parseFloat(row['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']) || 0;
        const area = parseFloat(row['Area Under Cultivation (UOM:Ha(Hectares))']) || 0;

        if (!count[crop]) {
            count[crop] = 1;
            yieldSum[crop] = yieldValue;
            areaSum[crop] = area;
        } else {
            count[crop]++;
            yieldSum[crop] += yieldValue;
            areaSum[crop] += area;
        }
    });

    // Calculate averages
    const averages = {};
    Object.keys(count).forEach(crop => {
        averages[crop] = {
            averageYield: yieldSum[crop] / count[crop],
            averageArea: areaSum[crop] / count[crop],
        };
    });

    return averages;
};
