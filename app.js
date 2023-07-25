require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { limiter } = require('./middlewares/limiter');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
mongoose.set('strictQuery', true);

const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    // 'http://firemandzen.nomoredomains.monster',
    // 'https://firemandzen.nomoredomains.monster',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

app.use('*', cors(options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect('mongodb://127.0.0.1/bitfilmsdb')
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((err) => console.error('Ошибка подключения:', err));

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
