const dummy = (blogs) => {
  return 1
}

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
]

const totalLikes = (blogs) => {
  return blogs
    .map(blog => blog.likes)
    .reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  const mostVotes = (most, current) => {
    if ( !most ) {
      return current
    }
    return current.likes < most.likes ? most : current
  }

  return blogs.reduce(mostVotes , null)
}

module.exports = { 
  dummy,
  totalLikes,
  favoriteBlog
}