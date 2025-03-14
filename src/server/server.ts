import express from 'express';
import path from 'path';

const app = express();
const apiRouter = require('./routes/api')

const PORT = 3000;

app.use(express.json());
// app.get('/', (req, res, next) => {
//     res.status(200)
//     res.send("hello")
// });


app.use('/api', apiRouter)


app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`)
})


module.exports = app;