import React from 'react'
import { useDispatch } from 'react-redux'

import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    dispatch(addComment(id, comment))
    e.target.comment.value = ''
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input type="text" name="comment" />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  )
}

export default CommentForm