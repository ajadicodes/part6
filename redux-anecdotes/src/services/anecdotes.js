import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const contentObject = { content, votes: 0 }
  const response = await axios.post(baseUrl, contentObject)
  return response.data
}

const updateVotes = async (id) => {
  const query = await axios.get(`${baseUrl}/${id}`)
  const anecdoteToUpdate = query.data
  const updatedAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1,
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

export default { getAll, createNew, updateVotes }
