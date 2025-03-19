import express from 'express';

import path from 'path';

const app = express();
const cors = require('cors')
const apiRouter = require('./routes/api')

const PORT = 3000;

app.use(cors())
app.use(express.json());
app.set('json spaces', 2);

app.use((req, res, next) => {
    // Simple logging function
    const startTime = Date.now();
    next();
    const endTime = Date.now();

    const duration = endTime  - startTime;
    console.log(`Route ended -  ${req.method} ${req.path} - ${res.statusCode} - ${duration} ms`);
});
// app.get('/', (req, res, next) => {
//     res.status(200)
//     res.send("hello")
// });


app.use('/api', apiRouter)



app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`)
})


module.exports = app;