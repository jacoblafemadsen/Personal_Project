const initialState = {
  currentVideoId: '',
  videoQueue: [],
  videoCurrentState: 4
}

const ADD_TO_QUEUE = 'ADD_TO_QUEUE',
      CHANGE_VIDEO_STATE = 'CHANGE_VIDEO_STATE'


export function addToQueue(videoUrl) {
  return {
    type: ADD_TO_QUEUE,
    payload: videoUrl
  }
}

export function changeVideoState(videoState) {
  return {
    type: CHANGE_VIDEO_STATE,
    payload: videoState
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {

    case ADD_TO_QUEUE:
      var str = action.payload
      str.length > 11 ? str = str.substr((str.search(/watch\?v=/) + 8), 11) : str = action.payload
      if(state.currentVideoId) {
        var newArr = [...state.videoQueue, str]
        return Object.assign({}, state, {videoQueue: newArr})
      }
      return Object.assign({}, state, {currentVideoId: str})

    case CHANGE_VIDEO_STATE:
      return Object.assign({}, state, {videoCurrentState: action.payload})

    default:
      return state
  }
}