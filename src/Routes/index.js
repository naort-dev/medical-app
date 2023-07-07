import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/App/Home';
import Loader from '../components/Loader';
import Category from '../screens/App/Category';
import Cart from '../screens/App/Cart';
import Menu from '../screens/App/Menu';
import Login from '../screens/Login';
import Profile from '../screens/App/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShopDetail from '../screens/App/ShopDetail';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppColors from '../utills/AppColors';
import {width} from 'react-native-dimension';
import styles from './styles';
import {getCompany} from '../backend/Stores';
import {loadCompanyAction} from '../Redux/Actions/Auth';
import {useDispatch, useSelector} from 'react-redux';
import CheckoutConfirm from '../screens/CheckoutStatus/CheckoutConfirm';
import {createOrUpdateAnalyticsProfile} from '../backend/Analytics';
import CheckoutLoading from '../screens/CheckoutStatus/CheckoutLoading';
import CheckoutRedirect from '../screens/CheckoutStatus/CheckoutRedirect';
import checkoutRoute  from './checkout';
import { SelectStoreScreen } from '../screens/App/selectStore';

const HomeStack = createStackNavigator();
const MenuStack = createStackNavigator();
const CartStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ShopStack = createStackNavigator();
const RootStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
export default function Routes() {
  const {company, isLogin, analyticsProfileId} = useSelector(
    (state) => state.Auth,
  );
  const checkout = useSelector(state => state.checkout)
  const dispatch = useDispatch();
  console.log(analyticsProfileId);
  useEffect(() => {
    (async () => {
      let company = await getCompany();
      dispatch(loadCompanyAction(company));

      const analyticsProfile = await createOrUpdateAnalyticsProfile(
        new Date().getTime().toString(),
      );
      console.log(analyticsProfile);
    })();
  }, []);

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
        }}>
        <HomeStack.Screen name="Home" component={Home} />
      </HomeStack.Navigator>
    );
  }
  function MenuStackScreen() {
    return (
      <MenuStack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
        }}>
        <MenuStack.Screen name="Menu" component={Menu} />
        <MenuStack.Screen name="Category" component={Category} />
      </MenuStack.Navigator>
    );
  }
  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator
        initialRouteName="Profile"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
        }}>
        <ProfileStack.Screen name="Profile" component={Profile} />
      </ProfileStack.Navigator>
    );
  }
  function CartStackScreen() {
    return (
      <CartStack.Navigator
        initialRouteName="Cart"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
          headerShown: false,
        }}>
        <CartStack.Screen name="Cart" component={Cart} />
      </CartStack.Navigator>
    );
  }
  function ShopStackScreen() {
    return (
      <ShopStack.Navigator
        initialRouteName="Shop"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
          headerShown: false,
        }}>
        <ShopStack.Screen name="Shop" component={ShopDetail} />
      </ShopStack.Navigator>
    );
  }
  function TabScreens() {
    return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          tabBarActiveTintColor: AppColors.accentColor, //?
          tabBarInactiveTintColor: AppColors.inaccentColor, //?
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarHideOnKeyboard: true,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
        }}
        View>
        <Tab.Screen
          name="HomeScreen"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <FontAwesome name="home" color={color} size={width(8)} />
            ),
          }}
        />
        <Tab.Screen
          name="MenuScreen"
          component={MenuStackScreen}
          options={{
            tabBarLabel: 'Menu',
            tabBarIcon: ({color}) => (
              <AntDesign name="bars" color={color} size={width(8)} />
            ),
          }}
        />
        <Tab.Screen
          name="ShopScreen"
          component={ShopStackScreen}
          options={{
            tabBarLabel: 'Shop',
            tabBarIcon: ({color}) => (
              <FontAwesome name="map" color={color} size={width(7.5)} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <FontAwesome name="user" color={color} size={width(8)} />
            ),
          }}
        />
        <Tab.Screen
          name="CartScreen"
          component={CartStackScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({color}) => (
              <FontAwesome name="shopping-cart" color={color} size={width(8)} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  const config = {
    screens: {
      LoginStack: 'login',
      CheckoutConfirm: {
        path: 'checkout/confirm/:id',
        parse: {
          id: (id) => `${id}`,
        },
      },
      TabScreens: {
        screens: {
          HomeScreen: 'home',
          MenuScreen: 'menu',
          ShopScreen: 'shop',
          ProfileScreen: 'profile',
          CartScreen: 'cart',
        },
      },
    },
  };
  function SelectStore({ navigation }) {
    function storeSelected(store) {
      console.log("SELECTED STORE")
      console.log(navigation)
      navigation.goBack()
    }
    return <SelectStoreScreen onSelect={storeSelected}/>
  }
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const linking = {
    prefixes: [`${company.app_url_scheme}://`],
    config,
  };
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^', linking, isLogin);
  if (isLogin) {
    if (checkout.isCheckingOut) {
      return checkoutRoute({ navTheme })
    }
    return (
      <NavigationContainer
        linking={linking}
        theme={navTheme}
        styles={{fontFamily: 'Akzidenz-grotesk-light'}}>
        <Loader />
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            gestureResponseDistance: 50,
          }}
          id="RootNavigator"
          initialRouteName="TabScreens">
          <RootStack.Screen name="TabScreens" component={TabScreens} />
          {/* <RootStack.Group screenOptions={{ presentation: 'modal' }}> */}
            <RootStack.Screen name="SelectStores" component={SelectStore} />
          {/* </RootStack.Group> */}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer
        linking={linking}
        theme={navTheme}
        styles={{fontFamily: 'Akzidenz-grotesk-light'}}>
        <Loader />
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            gestureResponseDistance: 50,
          }}
          initialRouteName="LoginStack">
          <RootStack.Screen name="LoginStack" component={Login} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
  
}
