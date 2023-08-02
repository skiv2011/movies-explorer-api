const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ValidationError = require('../error/validation-error');
const AuthDataError = require('../error/auth-error');
const NotFoundError = require('../error/notfound-error');
const ConflictError = require('../error/conflict-error');
const { statusCode } = require('../utils/errors');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const mongoUpdateConfig = { new: true, runValidators: true };

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFoundError('Пользователь не найден.'));
      return;
    }
    res.status(statusCode.OK).send({ name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(statusCode.CREATED).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован.'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      mongoUpdateConfig,
    );
    res.status(statusCode.OK).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError('Переданы некорректные данные.'));
    } else if (err.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже зарегистрирован.'));
    } else {
      next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new AuthDataError('Неправильная почта или пароль'));
      return;
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      next(new AuthDataError('Неправильная почта или пароль'));
      return;
    }
    const token = await jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    res.status(statusCode.OK)
      .cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .send({
        message: 'Токен сохранен в куки',
        name: user.name,
        email: user.email,
      });
  } catch (err) {
    next(err);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    res.status(statusCode.OK)
      .clearCookie('token', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .send({ message: 'Вы разлогинились' });
  } catch (err) {
    next(err);
  }
};
