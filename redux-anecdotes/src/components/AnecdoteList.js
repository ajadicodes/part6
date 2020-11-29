import React from 'react'
import { connect } from 'react-redux'
import { isOrderedByVotes } from '../helpers/anecdoteHelper'
import { upvote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVoteClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVoteClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {
  const onVoteClick = (id, content) => {
    props.upvote(id)
    props.setNotification(`You voted '${content}'.`, 10, props.notifier.timerID)
  }

  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVoteClick={() => onVoteClick(anecdote.id, anecdote.content)}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === '') {
    return {
      anecdotes: state.anecdotes.sort(isOrderedByVotes),
      notifier: state.notifier,
    }
  }
  return {
    anecdotes: state.anecdotes.filter((anecdote) =>
      anecdote.content.match(new RegExp(`${state.filter}`, 'i'))
    ),
    notifier: state.notifier,
  }
}

const mapDispatchToProps = {
  upvote,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
