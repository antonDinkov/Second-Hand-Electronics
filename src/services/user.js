const { User } = require('../models/User');
const bcrypt = require('bcrypt');

//TODO set identity prop name based on exam description
const identityName = 'email';

async function register(identity, username, password) {
    
    const existing = await User.findOne({ [identityName]: identity } );
    
    if (existing) {
        throw new Error(`This ${identityName} is already in use`);
    };

    const user = new User({
        username,
        [identityName]: identity,
        password: await bcrypt.hash(password, 10)
    });
    
    try {
        await user.save();
    } catch (err) {
        if (err.code == 11000) {
            throw new Error("This username is already in use");
        };
        throw err;
    }

    return user;
};

async function login(identity, password) {
    const user = await User.findOne({ [identityName]: identity } );

    if (!user) {
        throw new Error(`Incorrect ${identityName} or password`);
    };

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error(`Incorrect ${identityName} or password`);
    };

    await user.save();

    return user;
}

module.exports = {
    register,
    login
}