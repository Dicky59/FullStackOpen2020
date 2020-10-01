import blogService from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data.sort(byLikes)
  case 'LIKE':
    const liked = action.data
    return state.map(a => a.id===liked.id ? liked : a).sort(byLikes)
  case 'CREATE':
    return [...state, action.data]
  case 'REMOVE':
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const toLike = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(toLike)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    console.log(`addComment(${id}, ${comment})`)
    await blogService
      .map(id, comment)
      .then(updatedBlog => {
        console.log('added comment: ', updatedBlog)
        dispatch({
          type: 'ADD_COMMENT',
          data: updatedBlog
        })
      })
  }
}

export default blogReducer