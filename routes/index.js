module.exports = app => {
    app.get('/', (req, res) => res.render('index'));
    app.get('/github', (req, res) => res.redirect('https://github.com/ChalkPE/centre'));
};
