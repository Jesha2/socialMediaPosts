const {User} = require( '../models/user');
const {Post}= require( '../models/post');


module.exports = {
    addPost: async (req, res) => {
        console.log('addPost')
        try{
            const {title, content, status,  userId} =  req.body;
            await Post.create({title, content, privateStatus: status, userId})
            res.status(200).send("Form added");
            console.log('post added successfully');
        }
        catch(err){ 
            res.status(400).send("Error adding form " +err);
            console.error(err)
        }
    },
    getAllPosts: async (req, res) => {
        try {
            console.log("========================getAllPosts");

            const posts = await Post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            console.log("===================sucess in getAllPosts");

            res.status(200).send(posts);
        } catch (error) {
            console.log('ERROR IN getAllPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },
    getCurrentUserPosts1: async (req, res) => {
        try {
            const {userId} = req.params
            const posts = await Post.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]})
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN getCurrentUserPosts1')
            console.log(error)
            res.sendStatus(400)
        }
    },
    getCurrentUserPosts: async (req, res) => {
        const {userId} = req.params
        console.log('getCurrentUserPosts');
        try{
            const posts = await Post.findAll({where:{ userId :userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
        res.status(200).send(posts)

        }
        catch(error){ console.log('ERROR IN getCurrentUserPosts')
        console.log(error)
        res.sendStatus(400)}
    },
    editPost: async (req, res) => {
        try {
            const {id} = req.params
            const {status} = req.body
            await Post.update({privateStatus: status}, {
                where: {id: +id}
            })
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },
    deletePost: async (req, res) => {
        try {
            const {id} = req.params
            await Post.destroy({where: {id: +id}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    }   
}