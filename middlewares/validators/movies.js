const { celebrate, Joi } = require('celebrate');
const { regexURL } = require('../../utils/constants');

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(100),
    director: Joi.string().required().min(1).max(100),
    duration: Joi.number().required(),
    year: Joi.string().required().max(4),
    description: Joi.string().required(),
    image: Joi.string().regex(regexURL).required(),
    trailerLink: Joi.string().regex(regexURL).required(),
    thumbnail: Joi.string().regex(regexURL).required(),
    id: Joi.number().integer().required(),
    nameRU: Joi.string().required().min(1).max(100),
    nameEN: Joi.string().required().min(1).max(100),
  }),
});

module.exports.deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});
