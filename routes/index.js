const router = require('express').Router();
const { loginValidation, registerValidation } = require('../middlewares/validators/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const { signin, logout, createUser } = require('../controllers/users');
const NotFoundError = require('../error/notfound-error');

router.post('/signin', loginValidation, signin);

router.post('/signup', registerValidation, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.delete('/logout', logout);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
