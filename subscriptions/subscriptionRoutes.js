const routes = require('express').Router();

const EmailRepository = require('../repositories/emails');

routes.post('/subscriptions', (req, res) => {
  const { email } = req.body;

  EmailRepository.createSubscription({ email })
    .then((subscription) => res.send({ status: 200, subscription }))
    .catch((error) => res.send({ status: 400, message: error }));
});

module.exports = routes;