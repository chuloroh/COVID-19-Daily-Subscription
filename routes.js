const Router = require('express').Router;
const subscriptionRoutes = require('./subscriptions/subscriptionRoutes');

const routes = Router();

routes.use('/', subscriptionRoutes);

module.exports = routes;