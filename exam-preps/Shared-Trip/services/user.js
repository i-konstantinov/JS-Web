const User = require('../models/User');
const { compare, hash } = require('bcrypt');



async function register(email, password, gender) {
    const existing =  await getUserByEmail(email);

    if (existing) {
        throw new Error('Email already exists in database');
    } else if (password.length < 4) {
        throw new Error('Password must be at least 4 characters long');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        gender,
        hashedPassword
    });
    await user.save();

    return user;
}



async function login(email, password) {
    const user =  await getUserByEmail(email);
    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const hasMatch = await compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Incorrect email or password');
    }

    return user;
}



async function getUserByEmail(email) {
    // find user by full-match of field
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    return user;
}


module.exports = {
    login, 
    register,
    getUserByEmail
}