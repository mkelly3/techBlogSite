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
User.init({

})