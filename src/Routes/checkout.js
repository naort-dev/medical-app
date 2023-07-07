import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import customViews from "app/customViews"
import appConfig from "app/config"
import CheckoutConfirm from "../screens/CheckoutStatus/CheckoutConfirm";
import CheckoutLoading from "../screens/CheckoutStatus/CheckoutLoading";
import CheckoutRedirect from "../screens/CheckoutStatus/CheckoutRedirect";
import { createStackNavigator } from "@react-navigation/stack";
import Loader from '../components/Loader';

const CheckoutStack = createStackNavigator();

function defaultCheckoutRoute({ navTheme }) {
  
  const linking = {
    prefixes: [`${appConfig.APP_URL_SCHEME}://`],
    config: {
      screens: {
        CheckoutConfirm: {
          path: 'checkout/confirm/:id',
          parse: { id: (id) => `${id}` },
        },
      }
    }
  }

  return (
    <NavigationContainer
      linking={linking}
      theme={navTheme}
      styles={{fontFamily: 'Akzidenz-grotesk-light'}}>
      <Loader />
      <CheckoutStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
        }}
        initialRouteName="CheckoutLoading">
        <CheckoutStack.Screen 
          name="CheckoutConfirm" 
          component={CheckoutConfirm}
        />
        <CheckoutStack.Screen
          name="CheckoutLoading"
          component={CheckoutLoading} 
          initialParams={{ text: 'Preparing your Order...', isCancelOrder: false }}
        />
        <CheckoutStack.Screen
          name="CheckoutRedirect"
          component={CheckoutRedirect}
        />
      </CheckoutStack.Navigator>
    </NavigationContainer>
  );
}

export default customViews.checkoutRoute || defaultCheckoutRoute