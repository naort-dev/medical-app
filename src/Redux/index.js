import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import Reducers from './Reducers/index';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, Reducers);
const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);
export default store;
export const CARTVALS = new Array();
