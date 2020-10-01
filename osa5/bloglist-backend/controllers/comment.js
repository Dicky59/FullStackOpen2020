const commentRouter = require('express').Router()
const Comment = require('../models/comment')

commentRouter.get('/:id', async (request, response) => {
  const comments = await Comment.find({}).populate()
  response.json(comments.map(comment => comment.toJSON()))
})

commentRouter.post('/:id/comments', async (request, response) => {
  console.log(request.params)
  const body = request.body

  const comment = new Comment({
    comment: body.comment,
    blog: request.params.id
  })

  const savedComment = await comment.save()


  response.json(savedComment.toJSON())
})

module.exports = commentRouter