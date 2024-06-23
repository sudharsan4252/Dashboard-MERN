import ProductModel from '../Models/ProductTransactions.js';
import express from 'express';

const statisticsRouter = express.Router();

statisticsRouter.get('/', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month is required' });
    }

    const dateStart = new Date(`2022-${month}-01`);
    const dateEnd = new Date(`2022-${Number(month) + 1}-01`);

    const totalSales = await ProductModel.aggregate([
        { $match: { dateOfSale: { $gte: dateStart, $lt: dateEnd }, sold: true } },
        { $group: { _id: null, totalAmount: { $sum: '$price' } } }
    ]);

    const totalSoldItems = await ProductModel.countDocuments({ dateOfSale: { $gte: dateStart, $lt: dateEnd }, sold: true });
    const totalNotSoldItems = await ProductModel.countDocuments({ dateOfSale: { $gte: dateStart, $lt: dateEnd }, sold: false });

    res.json({
        totalSaleAmount: totalSales[0] ? totalSales[0].totalAmount : 0,
        totalSoldItems,
        totalNotSoldItems
    });
});

export default statisticsRouter;
