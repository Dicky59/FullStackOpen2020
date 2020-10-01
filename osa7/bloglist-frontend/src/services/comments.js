import axios from 'axios'
const baseUrl = '/api/blogs'

const getComment = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const postComment = async (content) => {
  const newComment = {
    comment: content.comment
  }
  const id = content.blog
  const response = await axios.post(`${baseUrl}/${id}/comments`, newComment)
  return response.data
}

export default { getComment, postComment }