const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create a Post in model
class Post extends Model {}

//define columns and rows in post 
// Post columsn and rows will have information about the id, title, content, user Id and the user id is the foregin key in post
Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );
  
  module.exports = Post;