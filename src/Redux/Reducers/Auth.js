import {
  LOGIN,
  LOGOUT,
  LOAD_COMPANY,
  SELECT_STORE,
  SET_ANALYTICS_PROFILE_ID,
} from '../Types';
const intialState = {
  user: {},
  isLogin: false,
  storeId: null,
  storeInfo: {},
  analyticsProfileId: null,
  company: {},
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: {},
        isLogin: false,
      };
    }
    case LOAD_COMPANY: {
      return {
        ...state,
        company: action.payload,
      };
    }
    case SELECT_STORE: {
      console.log(action.payload)
      return {
        ...state,
        storeId: action.payload.id ?? action.payload._id,
        storeInfo: action.payload,
      };
    }
    case SET_ANALYTICS_PROFILE_ID: {
      return {
        ...state,
        analyticsProfileId: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
