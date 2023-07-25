const router = require('express').Router();
const { editUpdateUserValidator } = require('../middlewares/validators/users');


const {
  getUser,
  updateUser,
} = require('../controllers/users');


router.get('/me', getUser);
router.patch('/me', editUpdateUserValidator, updateUser);

module.exports = router;
