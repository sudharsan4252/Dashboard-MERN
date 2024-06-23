import ProductModel from '../Models/ProductTransactions.js';
import express from 'express';

const barchartRouter = express.Router();

barchartRouter.get('/', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month is required' });
    }

    // Calculate start and end dates for the specified month
    const dateStart = new Date(`2022-${month}-01`);
    const dateEnd = new Date(`2022-${Number(month) + 1}-01`);

    // Define price ranges
    const priceRanges = [
        { range: '0-100', min: 0, max: 100 },
        { range: '101-200', min: 101, max: 200 },
        { range: '201-300', min: 201, max: 300 },
        { range: '301-400', min: 301, max: 400 },
        { range: '401-500', min: 401, max: 500 },
        { range: '501-600', min: 501, max: 600 },
        { range: '601-700', min: 601, max: 700 },
        { range: '701-800', min: 701, max: 800 },
        { range: '801-900', min: 801, max: 900 },
        { range: '901-above', min: 901, max: Infinity },
    ];

    try {
        // Fetch counts for each price range in parallel
        const results = await Promise.all(priceRanges.map(async ({ range, min, max }) => {
            const count = await ProductModel.countDocuments({
                dateOfSale: { $gte: dateStart, $lt: dateEnd },
                price: { $gte: min, $lt: max === Infinity ? Number.MAX_SAFE_INTEGER : max }
            });
            return { range, count };
        }));

        res.json(results);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default barchartRouter;
