// const router = require('express').Router();
// const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

// //using the custom middleware before allowing the user to access the gallary 
// router.get('/', withAuth, async(req, res) => {
//     try {
//         const dbPostData = await Post.findAll({
//             attributes: [
//                 'id',
//                 'title',
//                 'content',
//                 'created_at'
//               ],
//               include: [
//                 {
//                   model: Comment,
//                   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                   include: {
//                     model: User,
//                     attributes: ['username']
//                   }
//                 },
//                 {
//                   model: User,
//                   attributes: ['username']
//                 }
//               ]
//         })
//         const posts = dbPostData.map(post => post.get({ plain: true }));
//         res.render('dashboard', { 
//             posts, 
//             loggedIn: req.session.loggedIn });
//     }catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//       } 
// });

// //route for a user to edit their posts
// router.get('/edit:id', withAuth, async(req, res) => {
//     try {
//         const dbPostData = await Post.findByPk(req.params.id, {
//             attributes: [
//                 'id',
//                 'title',
//                 'content',
//                 'created_at'
//               ],
//               include: [
//                 {
//                   model: Comment,
//                   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                   include: {
//                     model: User,
//                     attributes: ['username']
//                   }
//                 },
//                 {
//                   model: User,
//                   attributes: ['username']
//                 }
//               ]
//         })
//         const posts = dbPostData.map(post => post.get({ plain: true }));
//         res.render('edit-post', { 
//             posts, 
//             loggedIn: req.session.loggedIn });
//     }catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//       } 
// });

// //routing user to sign in page 
// router.get('/new', (req, res) => {
//     res.render('new-post');
// });

// module.expors = router;const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();


router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
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
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 
                     'title',
                     'content',
                     'created_at'
                  ],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ]
      })
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
            // serialize data before passing to template
            const post = dbPostData.get({ plain: true });
            res.render('edit-post', {post, loggedIn: true});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
})


// redirecting users to sign in page once they sign up
router.get('/new', (req, res) => {
    res.render('new-post');
});



module.exports = router;
