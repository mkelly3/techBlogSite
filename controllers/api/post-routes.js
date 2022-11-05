const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//finding all posts 
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

//find one post by a specific id

router.get('/:id',async(req,res)=> {
    try{
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
    res.json(dbPostData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//creating a new post
router.post('/',withAuth, async(req,res) =>{
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        res.json(dbPostData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err)
    }

});

//updating a post
router.put('/:id', withAuth, async(req,res) => {
    try{
        const dbPostData = await Post.update({
            title:req.body.title,
            content: req.body.content
        },
        {
        where: {
            id: req.params.id
        }
        });
        res.json(dbPostData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//deleting a post

router.delete('/:id',withAuth, async(req,res) => {
    try {
        const dbPostData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(dbPostData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});
