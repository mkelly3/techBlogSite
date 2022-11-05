//routes for all homepage and login 

const sequelize = require('../config/connection');

//import user, post and comment models
const {Post, User, Comment} = require('../models');
const router = require('express').Router();


