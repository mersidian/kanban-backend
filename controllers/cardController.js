const Card = require('../models/Card');
const Board = require('../models/Board');

exports.createCard = async (req, res) => {
    try {
        const { title, boardId, columnId, priority } = req.body;

        const board = await Board.findOne({ _id: boardId, user: req.user._id });
        if (!board) {
            return res.status(404).json({ message: "Board not found or unauthorized" });
        }

        const newCard = await Card.create({
            title,
            board: boardId,
            columnId,
            priority: priority || 'Medium'
        });

        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCardsByBoard = async (req, res) => {
    try {
        const { boardId } = req.params;

        const board = await Board.findOne({ _id: boardId, user: req.user._id });
        if (!board) {
            return res.status(404).json({ message: "Board not found or unauthorized" });
        }

        const card = await Card.find({ board: boardId });
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCard = async (req, res) => {
    try {
        const { id } = req.params;

        const card = await Card.findById(id);
        if (!card) return res.status(404).json({ message: "Card not found" });

        //check board ownership
        const board = await Board.findById(card.board);
        if (board.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const updateCard = await Card.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updateCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCard = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await Card.findById(id);
        if (!card) return res.status(404).json({ message: "Card not found" });

        const board = await Board.findById(card.board);
        if(board.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await car.deleteOne();
        res.status(200).json({ message: "Card deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};