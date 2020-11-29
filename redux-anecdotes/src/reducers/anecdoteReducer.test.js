import anecdoteReducer from './anecdoteReducer'
import {
  initialState,
  anecdotesAtStart,
  getId,
  isOrderedByVotes,
} from '../helpers/anecdoteHelper'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  const state = [
    {
      content: 'First content',
      id: 1,
      votes: 8,
    },
    {
      content: 'Second content',
      id: 2,
      votes: 100,
    },
    {
      content: 'Third content',
      id: 3,
      votes: 0,
    },
  ]

  test('returns a reasonable default when state is undefined', () => {
    const action = {
      type: 'DO_NOTHING',
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toHaveLength(anecdotesAtStart.length)
    expect(newState).toEqual(initialState)
  })

  test('votes increases', () => {
    // upvote a votes of content whose id is 2
    const action = {
      type: 'UPVOTE',
      data: {
        id: 2,
      },
    }
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(state.length)
    // expect(newState).toContainEqual(state[2])
    expect(newState).toContainEqual({
      ...state[1],
      votes: state[1].votes + 1,
    })

    // check if votes are reordered
    const orderedNewState = [...newState].sort(isOrderedByVotes)
    expect(newState).toEqual(orderedNewState)
  })

  test('new anecdote is added', () => {
    const newAnecdote = {
      content: 'The land is green',
      id: getId(),
      votes: 0,
    }

    const action = {
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(state.length + 1)
    expect(newState).toContainEqual(newAnecdote)
  })
})
