import { combineReducers } from 'redux';

const auth = (state = null, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  auth,
});
