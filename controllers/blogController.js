const Blog = require('../models/blog')

// get blogs
const index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => res.render('blogs/index', { blogs: result, title: 'Home' }))
    .catch((err) => console.log(err))
}

const create = (req, res) => {
  res.render('blogs/create', { title: 'Create' })
}

const store = (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
    .then((result) => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
}

const show = (req, res) => {
  const id = req.params.id
  console.log(id)
  Blog.findById(id)
    .then((result) => {
      res.render('blogs/details', { blog: result, title: 'Blog Details' })
    })
    .catch(() => res.status(404).render('404', { title: 'Blog not found' }))
}

const edit = (req, res) => {
  const id = req.params.id
  Blog.findById(id)
    .then((result) => {
      res.render('blogs/update', { blog: result, title: 'Update Blog' })
    })
    .catch(() => res.status(404).render('404', { title: 'Blog not found' }))
}

const update = (req, res) => {
  const id = req.body.id
  const body = req.body
  Blog.findByIdAndUpdate(id, body, { useFindAndModify: false })
    .then(result => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
}

const destroy = (req, res) => {
  const id = req.params.id
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/' })
    })
    .catch(err => console.log(err))
}

module.exports = {
  index,
  create,
  store,
  show,
  destroy,
  update,
  edit
}
