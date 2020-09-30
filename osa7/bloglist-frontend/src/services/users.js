import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('fetched users: ', response.data)
  return response.data
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
};

export default { getAll, create }
