import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hii")
})

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
