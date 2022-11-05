const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//getting all comments
//don't need to be logged in to view the comments  
router.get('/',async (req,res) => {
    try {
        //find all comments and return them in json format
        const dbCommentData = await Comment.findAll({})
        res.json(dbCommentData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//getting one comment

router.get('/:id', async (req,res) => {
    try { 
        const dbCommentData = await Comment.findByPk(req.params.id, {
        })
        res.json(dbCommentData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

//need to be logged in in order to add, update or delte comments 
// creating a comment

router.post('/',withAuth, async(req,res)=>{
    try{
        const dbCommentData = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.body.user_id
        })
        res.json(dbCommentData)
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//editing a comment that has already been created

router.put('/:id', withAuth, async(req,res) => {
    try{
        const dbCommentData = await Comment.update({
            comment_text: req.body.comment_text
        }, {
            where: {
                id: req.params.id
            }
    })
    res.json(dbCommentData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//deleting a comment 
router.delete('/:id', withAuth, async(req,res) => {
    try {
        const dbCommentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(dbCommentData);
    }catch (err) {
        console.log(err);
    }
       
});


module.exports = router;