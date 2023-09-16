const router = require('express').Router();
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validators/movies');

const {
  getMovies,
  createMovie,
  delMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:_id', deleteMovieValidator, delMovie);

module.exports = router;
