const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


//create a comment model 
class Comment extends Model {}


//create columns and rows in comment table for information regarding the id, comment_text, user_id and post_id 
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      comment_text: {
        type: DataTypes.STRING,
        validate: {
            //the comment must be at least 6 characters long
            len: [6]
        }
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});
module.exports = Comment;