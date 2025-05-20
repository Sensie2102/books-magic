import express from 'express';
import { database } from './models/index.js'
import authRoute from './routes/authRoutes.js';
import bookRoute from './routes/bookRoutes.js';

const app = express();

database.sync({ alter: true })
    .then(() => console.log('Models synced with PostgreSQL'))
    .catch(err => console.error('Sync error:', err));


app.use(express.json());

app.use('/books', bookRoute)
app.use('/auth', authRoute)

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});