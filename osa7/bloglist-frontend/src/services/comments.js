import axios from 'axios'
const baseUrl = '/api/blogs'

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}
export default { getBlog }