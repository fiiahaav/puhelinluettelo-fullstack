import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson).then(response => response.data)
}

const update = (id, newPerson) => axios.put(`${baseUrl}/${id}`, newPerson).then(res => res.data)

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }