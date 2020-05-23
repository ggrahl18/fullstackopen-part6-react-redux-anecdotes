import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './App'

import anecdoteService from './services/anecdotes'
import anecdoteReducer from './reducers/anecdoteReducer'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(initializeAnecdotes(anecdotes))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)