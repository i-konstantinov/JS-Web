const User = require('../models/User');
const { compare, hash } = require('bcrypt');


// TODO add all fields required by the exam
async function register(firstName, lastName, email, password) {
    const existing =  await getUserByEmail(email);

    if (existing) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        email,
        hashedPassword
    });
    await user.save();

    return user;
}



// TODO change identifier
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
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
}


module.exports = {
    login, 
    register
}