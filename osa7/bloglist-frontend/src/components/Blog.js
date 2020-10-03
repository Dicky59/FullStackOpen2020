import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initComments, postComment } from '../reducers/commentReducer'
import { Button, Title, Text, Input, StyledA } from '../styledComponents'

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
      <Title>{aBlog.title}</Title>
      <StyledA href={`${aBlog.url}`}>{aBlog.url}</StyledA>
      <br></br>
      <div>{aBlog.likes} likes<Button onClick={() => handleLike()}>like</Button></div>
      <Text>added by {aBlog.user.name}</Text>
      <br></br>
      <Title>comments</Title>
      <form onSubmit={addComment}>
        <Input name='newComment'></Input>
        <Button type='submit'>Add comment</Button>
      </form>
      <br></br>
      <Text>{blogComments.map(comment => <li key={comment.id}>{comment.comment}</li>)}</Text>
    </div>
  )
}

export default Blog