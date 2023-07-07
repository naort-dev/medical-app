import React, {useEffect} from 'react';
import Routes from './Routes/index';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store, {persistor} from './Redux/index';
import FlashMessage from 'react-native-flash-message';
import {LogBox, SafeAreaView, StyleSheet} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import CheckoutPreview from './screens/CheckoutStatus/CheckoutSummary';
import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


// Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
// OneSignal.init("17bc1926-b761-4d42-9ad3-d1815ebd3716", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
LogBox.ignoreAllLogs(true);
export default function App() {
  // const getDevice = async () => {
  //   const state = await OneSignal.getDeviceState();
  //   console.log(state);
  // }
  if (__DEV__) {
    Reactotron
      .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
      .configure({host:'10.0.0.161'}) // controls connection & communication settings
      .useReactNative() // add all built-in react native plugins
      .connect() // let's connect!
      console.log('Reactotron Initialized!')
  }
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
        {/* <CheckoutPreview/> */}
        <FlashMessage position="bottom" icon="auto" />
      </PersistGate>
    </Provider>
  );
}
