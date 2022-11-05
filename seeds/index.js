const sequelize = require('../config/connection');
const seedComment = require('./comment-seed');
const seedUsers = require('./user-seed');
const seedPost = require('./post-seed');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedComment();

  await seedUsers();
  await seedPost();

  process.exit(0);
};

seedAll();
