const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
// Get Users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
// Get single user
    async getSingleUser(req, res) {
        try { 
            const user = await User.findOne({ _id: req.params.userId}).select('-__v');
            if (!user) {
                res.status(404).json({ message: "No user with that ID"});
            } else {
                res.json(user)
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
// create a user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
// update existing user
    async updateUser(req, res) {
        try {
            const updateUser = await User.findOneAndUpdate({ _id: req.params.userId},
                {username: req.body.username, email: req.body.email },
                { new: true }
            );
            if (!updateUser) {
                res.status(404).json({ message: "No User with that ID "});
            }
            res.json(updateUser)
            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            }   
    },
    // delete a user
    async deleteUser(req, res) {
        try { 
            const findUserToDelete = await User.deleteOne({ _id: req.params.userId});
            if (!findUserToDelete) {
                res.status(404).json({ message: "No User with that ID"});
            }
            await Thought.deleteMany({ username: findUserToDelete.username});

            res.json({ message: "User, and associated thoughts, deleted" });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //add a friend to your friend list
    async addFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendIdToPush = req.params.friendId;
            const findUser = await User.findByIdAndUpdate(userId,
                { $push: { friends: friendIdToPush}},
                { new: true })
            
            res.json(findUser)

        } catch(err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
// delete friend
    async deleteFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendIdToDelete = req.params.friendId;

            const findUser = await User.findByIdAndUpdate(userId,
                { $pull: { friends: friendIdToDelete}},
                { new: true})
            
            res.json(findUser);

        } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    }
}