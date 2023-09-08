const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 4004
//middleware
app.use(express.json())// this CB function is called for every request
app.use(cors())

const {sequelize} = require('./util/database');
const {User} = require('./models/user');
const {Post} = require('./models/post');
User.hasMany(Post);
Post.belongsTo(User)//the user created the post
// OR Post.belongsTo(User,{constraints: true, onDelete : "CASCADE"})//deletes the posta if user is deleted
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')
  

app.post('/register', register)
app.post('/login', login)

app.get('/posts', getAllPosts)

app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)


//listener
// app.listen(PORT, () => console.log(`Running on Port ${PORT}`));

// the force: true is for development -- it DROPS tables!!!
// sequelize.sync({ force: true })
sequelize.sync()//.sync connects to DB &creates tables based on the models & define relations
.then(() => {
    app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
})
.catch(err => console.log(err))
