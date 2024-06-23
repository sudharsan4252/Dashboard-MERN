import ProductModel from "./ProductTransactions.js";
import axios from "axios";
const API_URL= 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
const seedDatabase = async () => {
    try {
        const response = await axios.get(API_URL);
        const data = response.data;
        await ProductModel.deleteMany({});

        // Parse and normalize dates before saving to MongoDB
        const productsToInsert = data.map(item => ({
            ...item,
            dateOfSale: new Date(item.dateOfSale) // Ensure dateOfSale is parsed correctly
        }));

        await ProductModel.insertMany(productsToInsert);

        console.log('Database seeded successfully');
    
    } catch (error) {
        console.error('Error seeding the database:', error);
        process.exit(1);
    }
};
export default seedDatabase;
