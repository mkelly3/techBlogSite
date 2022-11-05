const {Comment} = require('../models');

const commentData = [
    {
      comment_text: "Great Job!",
      user_id: 1,
      post_id: 1  
    },
    {
        comment_text: "Awesome",
        user_id: 2,
        post_id: 2 
    },
    {
        comment_text: "I disagree with your analysis",
        user_id: 3,
        post_id: 3
    }

];

const seedComment = () =>Comment.bulkCreate(commentData);

module.exports = seedComment;