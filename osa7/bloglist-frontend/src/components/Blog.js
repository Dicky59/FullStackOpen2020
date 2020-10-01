import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initComments, postComment } from '../reducers/commentReducer'

const Blog = () => {
  const comments = useSelector(state => state.comments)
  const blog = useSelector(state => state.blog)
  const dispatch = useDispatch()
  const id = useParams().id
  const aBlog = blog.find(b => b.id === id)
  const blogComments = comments.filter(c => c.blog === id)

  const addComment =(event)=> {
    event.preventDefault()
    const commentObject = {
      comment: event.target.newComment.value,
      blog: id
    }
    dispatch(postComment(commentObject))
    event.target.newComment.value = ''
  }

  useEffect(() => {
    dispatch(initComments(id))
  }, [dispatch, id])

  if (!aBlog) {
    return null
  }

  const handleLike = () => {
    const updatedLikes = aBlog.likes
    const likedBlog = { ...aBlog, likes: updatedLikes }
    dispatch(likeBlog(likedBlog))
  }
  return (
    <div>
      <h1>{aBlog.title}</h1>
      <a href={`${aBlog.url}`}>{aBlog.url}</a>
      <br></br>
      <div>{aBlog.likes} likes<button onClick={() => handleLike()}>like</button></div>
      <div>added by {aBlog.user.name}</div>
      <br></br>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input name='newComment'></input>
        <button type='submit'>Add comment</button>
      </form>
      <br></br>
      {blogComments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
      <div>
        <ul>
        </ul>
      </div>
    </div>
  )
}

export default Blog