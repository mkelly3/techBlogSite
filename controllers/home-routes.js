//routes for all homepage and login 

const sequelize = require('../config/connection');

//import user, post and comment models
const {Post, User, Comment} = require('../models');
const router = require('express').Router();

//getting the homepage 
router.get('/', async (req,res) => {
    try {
        //find all posts 
        const dbPostData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [ 
                {
                    //all comments for that post and the user 
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                      model: User,
                      attributes: ['username']
                    }
                  },
                  {
                    //includ the user who created the post 
                    model: User,
                    attributes: ['username']
                  }
            ]
        });
        const posts = dbPostData.map((post) => 
            post.get({plain:true})
        );
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    }catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});



//route to login 
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
//route to signup
router.get('/signup', (req, res) => {
    res.render('signup');
});


module.exports = router;




