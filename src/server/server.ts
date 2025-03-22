import express from 'express';
import path from 'path';
//TypeScript complained about global error handler's req, res, next parameters unless the following is imported
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
const cors = require('cors')
const apiRouter = require('./routes/api')

const app = express();
const PORT = 3000;
dotenv.config();

app.use(cors({
  origin: "http://localhost:8081", // Allow requests from 8081
  credentials: true,  // Allow cookies/auth headers
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed  methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
}));

app.use(express.json()); 
app.use(session({
  secret: 'put secret key here',
  resave: false,
  saveUninitialized: true,
}))

app.use('/api', apiRouter)

//Global error handler to handle a middleware's next() with an error object parameter
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Global error handler caught error:', error);
    const globalErrorHandler = {
      log: 'Global error handler caught unknown middleware error',
      status: 500,
      message: { error: 'An error occurred.' },
    };
    const errorObject = Object.assign({}, globalErrorHandler, error);
    console.log(errorObject.log); // output value of object's log property
    return res.status(errorObject.status).json(errorObject.message); // return status value and parsed message value
  });

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`)
})

module.exports = app;