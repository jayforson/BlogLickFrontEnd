import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.post(baseUrl, newObject, config)
  return response.then(response => response.data)
}

const updateBlog = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response.then(response => response.data)
}

export default { getAll, createBlog, updateBlog, deleteBlog, setToken }