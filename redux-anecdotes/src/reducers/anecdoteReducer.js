import { isOrderedByVotes } from '../helpers/anecdoteHelper'
import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'UPVOTE': {
      const updatedAnecdote = action.data
      const anecdotes = state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
      return [...anecdotes].sort(isOrderedByVotes)
    }
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdote,
    })
  }
}

export const upvote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.updateVotes(id)
    dispatch({
      type: 'UPVOTE',
      data: updatedAnecdote,
    })
  }
}

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer
