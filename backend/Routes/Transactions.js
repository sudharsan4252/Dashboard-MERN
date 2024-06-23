import ProductModel from '../Models/ProductTransactions.js';
import express from 'express';
const transactionsRouter = express.Router();

transactionsRouter.get('/', async (req, res) => {
    const { month, search = '', page = 1, per_page = 10 } = req.query;

    const query = {};

    if (month) {
        query.dateOfSale = {
            $gte: new Date(`2022-${month}-01`),
            $lt: new Date(`2022-${Number(month) + 1}-01`)
        };
    }

    if (search) {
        query.$or = [
            { title: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
            { price: new RegExp(search, 'i') }
        ];
    }

    const transactions = await ProductModel.find(query)
        .skip((page - 1) * per_page)
        .limit(Number(per_page));

    res.json(transactions);
});

export default transactionsRouter;
