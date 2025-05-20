import express from 'express';
import { database } from './models/index.js'

const app = express();

database.sync({ alter: true })
    .then(() => console.log('Models synced with PostgreSQL'))
    .catch(err => console.error('Sync error:', err));



app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});