import {SET_LOADER_VISIBLE, LOAD_STOREFRONT} from '../Types';
const intialState = {
  isLoaderVisible: false,
  storefront: {},
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_LOADER_VISIBLE: {
      return {
        ...state,
        isLoaderVisible: action.payload,
      };
    }
    case LOAD_STOREFRONT: {
      return {
        ...state,
        storefront: action.payload,
      };
    }

    default:
      return state;
  }
};
export default reducer;
