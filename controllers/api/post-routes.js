const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',async(req,res)=> {
    try {
        const dbPostData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            //posts ordered from newest to oldest
            order:[
                ['created_at','DESC']
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
        //data is displayed newest to oldest 
        res.json(dbPostData.reverse())
    }catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});