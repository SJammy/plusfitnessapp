import {
  SET_SELECTED_ITEMS,
  RESET_SELECTED_ITEMS,
} from '../constants/workoutConstants'

const initialState = {
  selectedItems: [],
  workoutSettings: {},
  workoutTimerData: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ITEMS:
      return {
        ...state,
        selectedItems: action.payload.selectedItems,
        workoutSettings: action.payload.workoutSettings,
        workoutTimerData: action.payload.workoutTimerData,
      }
    case RESET_SELECTED_ITEMS:
      return {
        selectedItems: [],
        workoutSettings: {},
        workoutTimerData: [],
      }
    default:
      return state
  }
}

export default reducer
