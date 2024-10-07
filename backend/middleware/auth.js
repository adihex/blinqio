const jwt = require('jsonwebtoken');
const User = require("../models/User");

const auth = async (req, res, next) => {  // Added next parameter to pass control
    try {
        const token = req.header('Authorization').replace('Bearer ', '');  // Ensure there's a space after 'Bearer '

        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MySuPerSecretUltraSecureKey');

        // Find the user by the userId stored in the decoded token
        const user = await User.findOne({ _id: decoded.userId });
        if (!user) {
            throw new Error();
        }

        // Attach user and token to the request object for use in the next middleware/route
        req.token = token;
        req.user = user; // This is correct

        next(); //

    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

module.exports = auth;
