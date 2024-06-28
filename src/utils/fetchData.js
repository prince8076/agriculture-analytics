import Data from '../dataset.json';

export const fetchData = async () => {
    console.log("Dataset fetched:", Data);

    const aggregatedData = aggregateData(Data);
    const averageData = calculateAverages(Data);

    console.log("Aggregated data:", aggregatedData);
    console.log("Average data:", averageData);

    return { aggregatedData, averageData };
};

const aggregateData = (data) => {
    const result = {};

    data.forEach(row => {
        const year = row['Year'];
        const crop = row['Crop Name'];
        const production = parseFloat(row['Crop Production (UOM:t(Tonnes))']) || 0;

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

    const count = {};
    const yieldSum = {};
    const areaSum = {};

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

    const averages = {};
    Object.keys(count).forEach(crop => {
        averages[crop] = {
            averageYield: yieldSum[crop] / count[crop],
            averageArea: areaSum[crop] / count[crop],
        };
    });

    return averages;
};
