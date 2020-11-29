const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data
    default:
      return state
  }
}

export const setFilter = (searchString) => {
  return {
    type: 'FILTER',
    data: searchString,
  }
}

export default filterReducer
