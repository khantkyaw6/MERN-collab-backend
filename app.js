const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./src/routes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

app.use(errorMiddleware);

module.exports = app;
