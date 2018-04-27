
import axios from 'axios'

const initialState = {
  videoQueue: [],
  videoCurrentState: 4,
  user: {}
}

const CHANGE_VIDEO_STATE = 'CHANGE_VIDEO_STATE',
      GET_USER_INFO = 'GET_USER_INFO',
      NEXT_IN_QUEUE = 'NEXT_IN_QUEUE',
      JOIN_ROOM = 'JOIN_ROOM',
      GET_ROOM_QUEUE = 'GET_ROOM_QUEUE',
      ADD_TO_QUEUE = 'ADD_TO_QUEUE',
      DELETE_VIDEO = 'DELETE_VIDEO'


export function changeVideoState(videoState) {
  return {
    type: CHANGE_VIDEO_STATE,
    payload: videoState
  }
}

export function getUser() {
  let userData = axios.get('/auth/me').then(res => {
    return res.data
  }).catch(e => console.log(e))
  return {
    type: GET_USER_INFO,
    payload: userData
  }
}

export function nextInQueue() {
  return {type: NEXT_IN_QUEUE}
}

export function joinRoom(idObj) {
  var updatedUser = axios.put(`/api/users/${idObj.user_id}`, {rooms_id: idObj.rooms_id}).then(res => {
    return res.data
  })
  return {
    type: JOIN_ROOM,
    payload: updatedUser,
    meta: {
      newRooms_id: idObj.rooms_id
    }
  }
}
export function getRoomQueue(queueArr) {
  return {
    type: GET_ROOM_QUEUE,
    payload: queueArr
  }
}

export function addToQueue(obj) {
  return {
    type: ADD_TO_QUEUE,
    payload: obj
  }
}

export function deleteVideo(index) {
  return {
    type: DELETE_VIDEO,
    payload: index
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {

    case CHANGE_VIDEO_STATE:
      return Object.assign({}, state, {videoCurrentState: action.payload})

    case GET_USER_INFO + '_FULFILLED':
      return Object.assign({}, state, {user: action.payload})

    case NEXT_IN_QUEUE:      
      var arrObj = [...state.videoQueue]
      arrObj.shift()
      return Object.assign({}, state, {videoQueue: arrObj})

    case JOIN_ROOM + '_PENDING':
      let newUser = Object.assign({}, state.user)
      newUser.rooms_id = action.meta.newRooms_id
      return Object.assign({}, state, {user: newUser})

    case JOIN_ROOM + '_FULFILLED':
      return Object.assign({}, state, {user: action.payload})

    case  GET_ROOM_QUEUE:
      return Object.assign({}, state, {videoQueue: action.payload})

    case ADD_TO_QUEUE:
      var arrObj = [...state.videoQueue]
      arrObj.push(action.payload)
      return Object.assign({}, state, {videoQueue: arrObj})

    case DELETE_VIDEO:
      var arrObj = [...state.videoQueue]
      arrObj.splice(action.payload, 1)
      return Object.assign({}, state, {videoQueue: arrObj})

    default:
      return state
  }
}