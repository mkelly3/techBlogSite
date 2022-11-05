//require the Comment, Post and User models

const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

//create all associations between the models

//one user can create many posts
User.hasMany(Post,{
    foreignKey: 'user_id'
});


//a post belongs to a user
Post.belongsTo(User,{
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

//comments also belong to a user

Comment.belongsTo(User,{
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

//comment belongs to a post

Comment.belongsTo(Post,{
    foreignKey: 'post_id',
    onDelete: "cascade"
});

//User can make many comments

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

//Post can have many comments 
Post.hasMany(Comment,{
    foreignKey: 'post_id',
    onDelete: "cascade"
})

module.exports = {
    User,
    Post,
    Comment
}