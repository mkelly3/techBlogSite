const {User} = require('../models');

const userData = [
    {
        username: "mkelly3",
        email: "mkelly@gmail.com",
        password: "test1"
    },
    {
        username: "farley",
        email: "farley@gmail.com",
        password: "meow"
    },
    {
        username: "hi",
        email:"hello@gmail.com",
        passoword: "hola"
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;

