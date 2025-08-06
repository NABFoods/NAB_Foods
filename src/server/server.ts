import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import path from 'path';
//TypeScript complained about global error handler's req, res, next parameters unless the following is imported
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
const cors = require('cors');
const apiRouter = require('./routes/api');
const root = '/usr/src/app/client/dist';
const app = express();
const NODE_ENV = process.env.NODE_ENV || 'DEV';

app.use(
  cors({
    origin:
      NODE_ENV === 'PROD' ? 'http://localhost:3000' : 'http://localhost:8081', //if Node_env is defined as PROD domain will be localhost:3000
    credentials: true, // Allow cookies/auth headers
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed  methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

app.use(express.json());
app.set('trust proxy', 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/api', apiRouter);
app.use(express.static(root));
app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});
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

app.listen(3000, () => {
  console.log(`Server is listening on port: ${3000}...`);
});

module.exports = app;
