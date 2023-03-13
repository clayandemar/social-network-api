const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try { 
            const thought = await Thought.findOne({ _id: req.params.thoughtId}).select('-__v');
            if (!thought) {
                res.status(404).json({ message: "No thought with that ID"});
            } else {
                res.json(thought)
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const { thoughtText, username, userId } = req.body;

            const newThought = await Thought.create({ thoughtText, username });

            const getUser = await User.findByIdAndUpdate(userId,
                { $push: { thoughts: newThought._id }},
                { new: true }
            );

            res.json(newThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId}, {thoughtText: req.body.thoughtText},
                { new: true }
            );

            if (!updatedThought) {
                res.status(404).json({ message: "Can't find that thought"});
            }
            res.json(updatedThought)
            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            }   
    },
    async deleteThought(req, res) {
            try { 
                const findThoughtToDelete = await Thought.deleteOne({ _id: req.params.thoughtId});
                if (!findThoughtToDelete) {
                    res.status(404).json({ message: "Can't find ID of that thought"});
                }
                res.json({ message: "Thought Deleted" });
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
    },
    async createReaction(req, res) {
        try {
            const findThought = await Thought.findByIdAndUpdate(req.params.thoughtId,
                { $addToSet: { reactions: {username: req.body.username, reactionBody: req.body.reactionBody}}},
                { new: true });
            res.json(findThought)

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const findThought = await Thought.findByIdAndUpdate(req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.body.reactionId }}},
                { new: true });
            res.json(findThought)

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}