const {Post} = require('../models');
const sequelize = require('../config/connection');

const postData = [
    {
        title: "Hello World",
        content: "First program a devloper should write",
        user_id: 1
    },
    {
        title: "What is handlebars",
        content: "It is a javascript library used to create reusable webpage templates",
        user_id: 2
    },
    {
        title: "How do cookies go stale",
        content: "A developer can set a time limit in the cookies",
        user_id: 3
    }
];

const seedPost = () => Post.bulkCreate(postData);
module.exports = seedPost;