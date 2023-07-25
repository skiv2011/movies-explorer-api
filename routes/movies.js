const router = require('express').Router();
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validators/movies');


const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovieValidator,createMovie);
router.delete('/:_id', deleteMovieValidator, deleteMovie);

module.exports = router;
