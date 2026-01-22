const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const { protect } = require('../middleware/auth');

router.post('/', protect, boardController.createBoard);
router.get('/', protect, boardController.getMyBoards);

module.exports = router;