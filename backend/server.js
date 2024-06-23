import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './Config/database.js';
import barchartRouter from './Routes/Barchart.js';
import combinedRouter from './Routes/Combined.js';
import piechartRouter from './Routes/Piechart.js';
import statisticsRouter from './Routes/Statistics.js';
import transactionsRouter from './Routes/Transactions.js';
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

// database connection initialisation
connectDB();

// testing api
app.get("/",(req,res)=>{
    res.send("successfully running");
})

//routes
app.use('/api/transactions', transactionsRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/barchart', barchartRouter);
app.use('/api/piechart', piechartRouter);
app.use('/api/combined', combinedRouter);


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})