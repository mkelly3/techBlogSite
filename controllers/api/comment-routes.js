// const router = require('express').Router();
// const { Post, User, Comment } = require('../../models');
// const withAuth = require('../../utils/auth')

// //getting all comments
// //don't need to be logged in to view the comments  
// router.get('/',async (req,res) => {
//     try {
//         //find all comments and return them in json format
//         const dbCommentData = await Comment.findAll({})
//         res.json(dbCommentData);
//     }catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// //getting one comment

// router.get('/:id', async (req,res) => {
//     try { 
//         const dbCommentData = await Comment.findByPk(req.params.id, {
//         })
//         res.json(dbCommentData);
//     }catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }

// });

// //need to be logged in in order to add, update or delte comments 
// // creating a comment

// router.post('/',withAuth, async(req,res)=>{
//     try{
//         const dbCommentData = await Comment.create({
//             comment_text: req.body.comment_text,
//             post_id: req.body.post_id,
//             user_id: req.session.user_id
//         })
//         res.json(dbCommentData)
//     }catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// //editing a comment that has already been created

// router.put('/:id', withAuth, async(req,res) => {
//     try{
//         const dbCommentData = await Comment.update({
//             comment_text: req.body.comment_text
//         }, {
//             where: {
//                 id: req.params.id
//             }
//     })
//     res.json(dbCommentData);
//     }catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// //deleting a comment 
// router.delete('/:id', withAuth, async(req,res) => {
//     try {
//         const dbCommentData = await Comment.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })
//         res.json(dbCommentData);
//     }catch (err) {
//         console.log(err);
//     }      
// });


// module.exports = router;
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//route to get all the comments
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err); 
            res.status(500).json(err); 
        })
});

//route to get 1 comment
router.get('/:id', (req, res) => {
    Comment.findAll({
            where: { 
                id: req.params.id}
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err); 
            res.status(500).json(err); 
        })
});


//route to create a comment
router.post('/', withAuth, (req, res) => {
    // check session
    if (req.session) {
    Comment.create({
        comment_text: req.body.comment_text, 
        post_id: req.body.post_id,
        // use the id from the session
        user_id: req.session.user_id,
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
});


//route to update a comment
router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
      },
      {
        where: {
          id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//route to delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id 
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;