module.exports = (req, res) => {
    res.locals = {title: 'Home'}
    res.render('home');
}