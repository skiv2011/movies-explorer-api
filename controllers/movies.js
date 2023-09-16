const mongoose = require('mongoose');
const { statusCode } = require('../utils/errors');
const Movie = require('../models/movie');
const ValidationError = require('../error/validation-error');
const ForbiddenError = require('../error/forbidden-error');
const NotFoundError = require('../error/notfound-error');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.status(statusCode.OK).send(movies);
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      id,
      nameRU,
      nameEN,
    } = req.body;
    const owner = req.user._id;
    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      id,
      nameRU,
      nameEN,
    });
    res.status(statusCode.CREATED).send(newMovie);
  } catch (err) {
    next(err);
  }
};

module.exports.delMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      next(new NotFoundError('Фильм с таким таким id не найден.'));
      return;
    }
    if (req.user._id !== movie.owner.toString()) {
      next(new ForbiddenError('Это не ваш фильм!'));
      return;
    }
    const deletedMovie = await movie.deleteOne();
    res.status(statusCode.OK).send( deletedMovie );
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new ValidationError('Неверный формат id фильма.'));
    } else {
      next(err);
    }
  }
};
