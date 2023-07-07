import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {showMessage} from 'react-native-flash-message';
import {View, Text, ActivityIndicator, Button, Linking} from 'react-native';
import styles from './styles';
import {recordAnalytics} from '../../../backend/Analytics';
import {EVENT} from '../../../utills/Constants';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cancelCheckout, postCheckout} from '../../../backend/Catalog';
import checkoutActions from '../../../Redux/Actions/Checkout'

function Loading({navigation, cart, route}) {
  const {text, isCancelOrder} = route.params;
  const checkoutState = useSelector(state => state.checkout)
  const orderId = checkoutState.order?.id
  const isCheckoutOrder = checkoutState.checkoutId === undefined

  const dispatch = useDispatch();
  const checkoutOrder = async () => {
    const items = cart.items.map((item) => ({
      product_id: item.product.id,
      option_id: item.option.id,
      quantity: item.quantity,
    }));
    console.log(JSON.stringify(items));
    recordAnalytics(EVENT.START_CHECKOUT, {
      cart_items: cart.items.map((item) => ({
        product_id: item.product.external_id,
        option_id: item.product.options[0].name,
        quantity: item.quantity,
        product_category: item.product.category.id,
        price: item.product.options[0].price,
      })),
    });
    OneSignal.deleteTag('cart_cancelled_checkout');
    OneSignal.sendTags({
      cart_began_checkout: new Date(),
      cart_items: cart.items.map((item) => ({
        product_id: item.product.external_id,
        option_id: item.product.options[0].name,
        quantity: item.quantity,
        product_category: item.product.category.id,
        price: item.product.options[0].price,
      })),
    });
    let token = await AsyncStorage.getItem('Token');
    console.log(token);
    const res = await postCheckout(items);
    console.log('===============================');
    console.log(res);
    

    if (res) {
      dispatch(checkoutActions.startCheckout(res.id))
      Linking.openURL(res.checkout_url);
      navigation.navigate('CheckoutRedirect', {
        redirectUri: res.checkout_url,
        checkoutId: res.checkoutId,
      });
    } else {
      navigation.navigate('HomeScreen');
    }
  };
  const cancelOrder = async () => {
    console.log('CANCELING ORDER')
    const res = await cancelCheckout(orderId);
    dispatch(checkoutActions.cancelCheckout())
    showMessage({
      message: 'Info',
      description: 'Order is cancelled',
      type: 'info',
    });
    
  };

  useEffect(() => {
    if (checkoutState.isCheckingOut) {
      if (isCheckoutOrder) {
        checkoutOrder();
      } else if (isCancelOrder) {
        cancelOrder();
      }
    }
  }, [checkoutState.isCheckingOut, isCheckoutOrder, isCancelOrder]);
  return (
    <ScreenWrapper>
      <View style={styles.mainViewContainer}>
        <Text style={styles.login}>{text}</Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </ScreenWrapper>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  checkout: state.checkout
});

export default connect(mapStateToProps, null)(Loading);
