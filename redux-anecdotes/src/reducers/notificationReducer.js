const notificationReducer = (
  state = {
    message: null,
    timerID: null,
  },
  action
) => {
  switch (action.type) {
    case 'NOTIFY':
      return { ...state, message: action.message }
    case 'REMOVE_NOTIFICATION':
      return { ...state, message: action.message }
    case 'SET_TIMER_ID':
      return { ...state, timerID: action.timerID }
    default:
      return state
  }
}

export const setNotification = (content, waitTime, timerId = null) => {
  // reset notification after 5 seconds of upvoting
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message: content,
    })

    if (timerId) {
      clearTimeout(timerId)
    }

    const timerID = setTimeout(() => {
      dispatch(removeNotification())
    }, waitTime * 1000)

    dispatch({
      type: 'SET_TIMER_ID',
      timerID,
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    message: null,
  }
}

export default notificationReducer
