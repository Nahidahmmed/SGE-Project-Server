// middleware/roleCheck.js
const { ObjectId } = require('mongodb');

const roleCheck = (roles) => {
    return async (req, res, next) => {
        const userId = req.headers['userid']; // Assuming the user ID is passed in headers for simplicity
        if (!userId) {
            return res.status(401).json({ message: 'No user ID provided' });
        }

        try {
            const user = await req.db.collection('Users').findOne({ _id: new ObjectId(userId) });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };
};

module.exports = roleCheck;
