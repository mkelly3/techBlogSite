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

//get one blog post

router.get('/post/:id', async(req,res) =>{
    try {
        //finding a single post by the id
        const dbPostData = await Post.findByPk(req.params.id, {
            //all of the attributes for the post incluind id, content, title, time created
            attributes: [
                'id',
                'content',
                'title',
                'created_at'
            ],
            //including the comments and users for the post 
            include: [{
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
        });
        //rendering the post to the psot page and making sure the user is logged in
        const posts = dbPostData.get({plain:true});
        res.render('post', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//redirecting the user to see all of their posts with comments



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




