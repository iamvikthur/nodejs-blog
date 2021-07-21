// require express
const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://iamvikthur:R3xv1c00@cluster0.rppec.mongodb.net/node_blog?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    // listen for requests
    console.log('connected to db')
    app.listen(3000)
  })
  .catch((err) => console.log(err))
// set view engine
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// store data to database
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'New blog 0 title',
//     snippet: 'New blog snippet',
//     body: 'More about the blog snippet'
//   })

//   blog.save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err))
// })

// get data from database
// app.get('/get-data', (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err))
// })

// basic routes
app.get('/', (req, res) => {
  // res.send('<p>Home page</p>')
  // res.sendFile('./views/index.html', { root: __dirname })
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
//   res.send('<p>About page</p>')
  // res.sendFile('./views/about.html', { root: __dirname })
  res.render('about', { title: 'About' })
})

// redirect
app.get('/about-us', (req, res) => {
  res.redirect('/about')
})

// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname })
  res.status(404).render('404', { title: '404' })
})
