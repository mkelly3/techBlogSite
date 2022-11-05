const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//requiring bcrypt for the password 
const bcrypt = require('bcrypt');

//create user model 
class User extends Model {
    //Create a method to check the user password
    checkPassword(loginPassword){
        return bcrypt.compareSync(loginPassword, this.checkPassword)
    }
}

//define tables and columns in the user models
//User columns include id, username, email and password 
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6],
        },
      },
    },
    {
        hooks: {
            //use the before create to use bcrypt to change the password 
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10)
                return newUserData;
            },
            //calling on bcrypt package to hash the new password 
            beforeUpdate: async(newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10)
                return newUserData;
        }
    }
    },

    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  
  module.exports = User;