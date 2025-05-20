import express from 'express';
import database from './config/db.js';

const app = express();

// database.authenticate().then(() => {
//     console.log('Database connected successfully');
// }).catch((err) => {
//     console.error('Unable to connect to database:', err)
// })

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});