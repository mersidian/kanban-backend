const Board = require('../models/Board');

exports.createBoard = async (req, res) => {
    try {
        const { title } = req.body;
        const board = await Board.create({
            title,
            user: req.user._id,

            //default tags and columns
            tags: [
                { name: 'High Priority', color: '#e74c3c' },
                { name: 'Medium', color: '#f1c40f' },
                { name: 'Low', color: '#2ecc71' }
            ],
            columns: [
                { title: 'To Do', position: 0 },
                { title: 'In Progress', position: 1 },
                { title: 'Done', position: 2 }
            ]
        });

        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyBoards = async (req, res) => {
    try {
        const boards = await Board.find({ user: req.user._id });
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};