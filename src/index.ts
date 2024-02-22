import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import { connectToDatabase } from './db/connection';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', routes);

connectToDatabase();

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


