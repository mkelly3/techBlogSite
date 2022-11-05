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

//route for a user to edit their posts
router.get('/edit:id', withAuth, async(req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
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
        res.render('edit-post', { 
            posts, 
            loggedIn: req.session.loggedIn });
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
      } 
});

//routing user to sign in page 
router.get('/new', (req, res) => {
    res.render('new-post');
});

module.expors = router;
