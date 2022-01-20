module.exports = (req, res) => {
    res.locals = {title: 'About'}
    res.render('about');
}