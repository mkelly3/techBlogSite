// const router = require('express').Router();
// const apiRoutes = require('./api');
// const homeRoutes = require('./home-routes');
// const dashRoute = require('./dashboard-routes');

// //added routes to the home,dashboard and api
// router.use('/api',apiRoutes);
// router.use('/',homeRoutes);
// router.use('/',dashRoute);

// module.exports = router;
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});



module.exports = router;