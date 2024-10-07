const jwt = require('jsonwebtoken');
const User = require("../models/User");

const auth = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '');
        const decoded = jwt.verify(tokem.process.env.JWT_SECRET || 'MySuPerSecretUltraSecureKey')
        const user = await User.findOne({
            _id: decoded.userId
        });

        if (!user) {
            throw new Error();
        }


        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};


module.exports = auth;
