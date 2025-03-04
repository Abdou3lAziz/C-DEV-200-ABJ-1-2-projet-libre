const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);


router.get('/', userController.getAllUsers);

//AUthenfifier 
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
