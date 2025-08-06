const { Pool } = require('pg');
import { params } from '../../types';
const dotenv = require('dotenv');
dotenv.config();

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  // query: (text: string, params:params, callback: object) => {
  query: (text: string, params: params, callback: object) => {
    // console.log('executed query', text);
    // return pool.query(text, params, callback)
    return pool.query(text, params, callback);
  },
};
