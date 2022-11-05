const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

//added routes to the home,dashboard and api
router.use('/api',apiRoutes);
router.use('/home',homeRoutes);
router.use('/dashboard',dashboardRoutes);

module.exports = router;
