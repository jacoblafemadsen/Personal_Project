
import axios from 'axios'

const initialState = {
  currentVideo: {},
  videoQueue: [],
  videoCurrentState: 4,
  user: {}
}

const ADD_TO_QUEUE = 'ADD_TO_QUEUE',
      CHANGE_VIDEO_STATE = 'CHANGE_VIDEO_STATE',
      GET_USER_INFO = 'GET_USER_INFO',
      NEXT_IN_QUEUE = 'NEXT_IN_QUEUE',
      JOIN_ROOM = 'JOIN_ROOM'


export function addToQueue(videoUrl) {
  var vidId = videoUrl
  vidId.length > 11 ? vidId = vidId.substr((vidId.search(/watch\?v=/) + 8), 11) : vidId = videoUrl
  var videoObj = axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${vidId}&key=${process.env.REACT_APP_YOUTUBE}&part=snippet,statistics`).then(res => {
    var obj = {
      id: vidId, 
      name: res.data.items[0].snippet.localized.title,
      img: res.data.items[0].snippet.thumbnails.default.url
    }
    return obj
  }).catch(e => console.log(e))
  return {
    type: ADD_TO_QUEUE,
    payload: videoObj
  }
}

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
  var updatedUser = axios.put(`/api/joinroom/${idObj.user_id}`, {room_id: idObj.room_id}).then(res => {
    return res.data
  })
  return {
    type: JOIN_ROOM,
    payload: updatedUser,
    meta: {
      newRooms_id: idObj.room_id
    }
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {

    case ADD_TO_QUEUE + '_FULFILLED':
      if(state.currentVideo.id) {
        var arrObj = [...state.videoQueue, action.payload]
        return Object.assign({}, state, {videoQueue: arrObj})
      } else {
        return Object.assign({}, state, {currentVideo: action.payload})
      }

    case CHANGE_VIDEO_STATE:
      return Object.assign({}, state, {videoCurrentState: action.payload})

    case GET_USER_INFO + '_FULFILLED':
      return Object.assign({}, state, {user: action.payload})

    case NEXT_IN_QUEUE:      
      var arrObj = [...state.videoQueue]
      var curVid = arrObj.pop()
      return Object.assign({}, state, {currentVideo: curVid, videoQueue: arrObj})

    case JOIN_ROOM + '_PENDING':
      let newUser = Object.assign({}, state.user)
      newUser.rooms_id = action.meta.newRooms_id
      return Object.assign({}, state, {user: newUser})

    case JOIN_ROOM + '_FULFILLED':
      return Object.assign({}, state, {user: action.payload})

    default:
      return state
  }
}