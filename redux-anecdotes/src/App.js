import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import Filter from './components/Filter'
import { initialiseAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const notification = useSelector((state) => state.notifier.message)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification ? <Notification /> : null}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
