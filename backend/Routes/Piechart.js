import ProductModel from '../Models/ProductTransactions.js';
import express from 'express';

const piechartRouter = express.Router();

piechartRouter.get('/', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month is required' });
    }

    const dateStart = new Date(`2022-${month}-01`);
    const dateEnd = new Date(`2022-${Number(month) + 1}-01`);

    const categories = await ProductModel.aggregate([
        { $match: { dateOfSale: { $gte: dateStart, $lt: dateEnd } } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json(categories);
});

export default piechartRouter;
