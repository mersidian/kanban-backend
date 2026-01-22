const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', cardController.createCard);
router.get('/:boardId', cardController.getCardsByBoard);
router.put('/:id', cardController.updateCard);
router.delete('/:id', cardController.deleteCard);

module.exports = router;