const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await Blog.insertMany(helper.blogs)
})

describe('api get', () => {
  jest.setTimeout(15000) //pidentää Jestin timeout-limiittiä, alkujaan (5000 ms)

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs is returned', async () => {
    const response =  await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogs.length)
  })

  test('a specific blog is among the returned blogs', async () => {
    const response =  await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('TDD harms architecture')
  })
  test('blogs should have "id" instead of "_id"', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  })
})

describe('api post', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      author: 'Joe Zimmermann',
      title: 'Simplifying Asynchronous Coding with Async Functions',
      url: 'https://www.sitepoint.com/simplifying-asynchronous-coding-async-functions/',
      likes: 348,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
    
      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain(
        'Simplifying Asynchronous Coding with Async Functions'
      )
  })
  test('likes set to 0 if missing', async () => {
    const newBlog = {
        title: '10 Things Bloggers Do to Get More Followers',
        author: 'Gemma',
        url: 'https://maketraffichappen.com/how-to-get-blog-followers/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const added = blogsAtEnd.find(b => b.title === newBlog.title)
      expect(added.likes).toBe(0)
  })

  test('blog with no title or url not added and error message ', async () => {
    const newBlog = {
      title: '10 Tips for Creating Great Blog Titles',
      author: 'Kristen Hicks'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.blogs.length)
  })

  test('delete blog from list', async () => {

    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('likes of a blog are updated', async () => {
    const [ blog ] = await helper.blogsInDb()
  
    const editedBlog = { ...blog, likes: blog.likes + 1 }
  
    await api
      .put(`/api/blogs/${blog.id}`)
      .send(editedBlog)
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
    const edited = blogsAtEnd.find(b => b.title === blog.title)
    expect(edited.likes).toBe(blog.likes + 1)
  })

})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})