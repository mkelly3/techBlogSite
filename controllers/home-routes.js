// //routes for all homepage and login 
// //import user, post and comment models
// const router = require('express').Router();
// const {Post, User, Comment} = require('../models');


// //getting the homepage 
// router.get('/', async (req,res) => {
//     try {
//         //find all posts 
//         const dbPostData = await Post.findAll({
//             attributes: [
//                 'id',
//                 'title',
//                 'content',
//                 'created_at'
//             ],
//             include: [ 
//                 {
//                     //all comments for that post and the user 
//                     model: Comment,
//                     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                     include: {
//                       model: User,
//                       attributes: ['username']
//                     }
//                   },
//                   {
//                     //includ the user who created the post 
//                     model: User,
//                     attributes: ['username']
//                   }
//             ]
//         });
//         const posts = dbPostData.map((post) => 
//             post.get({plain:true})
//         );
//         res.render('homepage', {
//             posts,
//             loggedIn: req.session.loggedIn
//         })
//     }catch (err) {
//         console.log(err);
//         res.status(500).json(err)
//     }
// });

// //get one blog post

// router.get('/post/:id', async(req,res) =>{
//     try {
//         //finding a single post by the id
//         const dbPostData = await Post.findByPk(req.params.id, {
//             //all of the attributes for the post incluind id, content, title, time created
//             attributes: [
//                 'id',
//                 'content',
//                 'title',
//                 'created_at'
//             ],
//             //including the comments and users for the post 
//             include: [{
//                 model: Comment,
//                 attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//         });
//         //rendering the post to the psot page and making sure the user is logged in
//         const posts = dbPostData.get({plain:true});
//         res.render('post', {
//             posts,
//             loggedIn: req.session.loggedIn
//         });
//     }catch (err) {
//         console.log(err);
//         res.status(500).json(err)
//     }
// });

// //redirecting the user to see all of their posts with comments

// router.get('/post-comment', async (req,res) =>{
//     try {
//         const dbPostData = await Post.findByPk(req.params.id, {
//             //all of the attributes for the post incluind id, content, title, time created
//             attributes: [
//                 'id',
//                 'content',
//                 'title',
//                 'created_at'
//             ],
//             //including the comments and users for the post 
//             include: [{
//                 model: Comment,
//                 attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//         });
//         //rendering the post to the psot page and making sure the user is logged in
//         const posts = dbPostData.get({plain:true});
//         res.render('post-comments', {
//             posts,
//             loggedIn: req.session.loggedIn
//         });
//     }catch (err) {
//         console.log(err);
//         res.status(500).json(err)
//     }
// })

// //route to login 
// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//       res.redirect('/');
//       return;
//     }
  
//     res.render('login');
//   });
  
// //route to signup
// router.get('/signup', (req, res) => {
//     res.render('signup');
// });


// module.exports = router;




// will contain all of the user-facing routes, such as the homepage and login page
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();


router.get('/', (req, res) => {
    Post.findAll({
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
      .then(dbPostData => {
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});



// redirecting users to homepage once they log in
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('login');
});

// redirecting users to sign in page once they sign up
router.get('/signup', (req, res) => {
    res.render('signup');
});

//rendering one post to the single-post page
router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'content',
        'title',
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
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbPostData.get({ plain: true });
  
        // pass data to template
        console.log(post);
        res.render('single-post', { post, loggedIn: req.session.loggedIn});


      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// redirecting users to see all their posts with comments
router.get('/posts-comments', (req, res) => {
    Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'content',
          'title',
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
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
    
          // serialize the data
          const post = dbPostData.get({ plain: true });
    
          // pass data to template
          res.render('posts-comments', { post, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router; 