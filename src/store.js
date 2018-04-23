import { createStore, applyMiddleware } from 'redux'
import reducer from './ducks/video_reducer'
import promiseMiddleware from 'redux-promise-middleware'

export default createStore(reducer, applyMiddleware(promiseMiddleware()))