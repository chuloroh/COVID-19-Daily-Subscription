const routes = require('express').Router();

routes.post('/subscriptions', (req, res) => {
    const body = req.body;
    console.log(body);
    res.send(req.body.email);
});

module.exports = routes;