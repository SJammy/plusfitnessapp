import { SET_SELECTED_ITEMS, RESET_SELECTED_ITEMS } from '../constants/workoutConstants';

export const startWorkout = (intervalsData) => {
  return {
    type: SET_SELECTED_ITEMS,
    payload: intervalsData
  };
};
export const resetWorkout = () => {
  return {
    type: RESET_SELECTED_ITEMS,
    // payload: {}
  };
};
