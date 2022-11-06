const { User } = require('../models');

const userData = [
  {
    username: 'mkelly3',
    password: 'test1'
    
  },
  {
    username: 'akelly4',
    password: 'test2'
  },
  {
    username: 'sydMilburn2',
    password: 'test3'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;