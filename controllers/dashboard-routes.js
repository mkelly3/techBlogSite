const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//using the custom middleware before allowing the user to access the gallary 
router.get('/', withAuth, async(req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
              ],
              include: [
                {
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                    model: User,
                    attributes: ['username']
                  }
                },
                {
                  model: User,
                  attributes: ['username']
                }
              ]
        })
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { 
            posts, 
            loggedIn: req.session.loggedIn });
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    
});