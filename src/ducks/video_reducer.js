
import axios from 'axios'

const initialState = {
  currentVideo: {},
  videoQueue: [],
  videoCurrentState: 4,
  user: {}
}

const ADD_TO_QUEUE = 'ADD_TO_QUEUE',
      CHANGE_VIDEO_STATE = 'CHANGE_VIDEO_STATE',
      GET_USER_INFO = 'GET_USER_INFO'


export function addToQueue(videoUrl) {
  var vidId = videoUrl
  vidId.length > 11 ? vidId = vidId.substr((vidId.search(/watch\?v=/) + 8), 11) : vidId = videoUrl
  var videoObj = axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${vidId}&key=${process.env.REACT_APP_YOUTUBE}&part=snippet,statistics`).then(res => {
    var obj = {
      id: vidId, 
      name: res.data.items[0].snippet.localized.title,
      img: res.data.items[0].snippet.thumbnails.default.url
    }
    console.log(obj)
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

export default function reducer(state = initialState, action) {
  switch(action.type) {

    case ADD_TO_QUEUE + '_FULFILLED':
      if(state.currentVideo.id) {
        var newArr = [...state.videoQueue, action.payload]
        return Object.assign({}, state, {videoQueue: newArr})
      } else {
        return Object.assign({}, state, {currentVideo: action.payload})
      }

    case CHANGE_VIDEO_STATE:
      return Object.assign({}, state, {videoCurrentState: action.payload})

    case GET_USER_INFO + '_FULFILLED':
      return Object.assign({}, state, {user: action.payload})

    default:
      return state
  }
}