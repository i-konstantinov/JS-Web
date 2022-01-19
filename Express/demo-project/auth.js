function loggedUser(req, res, next) {
    if (req.headers['x-auth']) {
        next();
    } else {
        res.status(401).send('Please log in!');
    }
}

module.exports = {loggedUser};