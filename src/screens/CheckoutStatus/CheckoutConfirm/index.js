import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, ActivityIndicator, Button} from 'react-native';
import styles from './styles';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import {confirmCheckout} from '../../../backend/Catalog';
import OneSignal from 'react-native-onesignal';
import {recordAnalytics} from '../../../backend/Analytics';
import {EVENT} from '../../../utills/Constants';
import {clearCart} from '../../../Redux/Actions/Cart';
import checkoutActions from '../../../Redux/Actions/Checkout'

export default function CheckoutConfirm({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const checkoutState = useSelector(state => state.checkout)
  const dispatch = useDispatch();
  const confirmCheckoutAction = async () => {
    setLoading(true);
    console.log(route?.params?.id);
    const res = await confirmCheckout(route?.params?.id, { order_number: route.params?.orderNumber });
    // console.log(res);
    recordAnalytics(EVENT.FINISH_CHECKOUT, {
      cart_items: res.items,
    });
    OneSignal.deleteTags([
      'cart_cancelled_checkout',
      'cart_began_checkout',
      'cart_updated_at',
      'cart_items',
    ]);
    OneSignal.sendTags({
      last_order_at: new Date(),
      last_order_total: res.price.last_order_total,
    });
    showMessage({
      message: 'Success',
      description: 'Checkout Confirmed',
      type: 'success',
    });
    
    dispatch(clearCart());
    dispatch(checkoutActions.completeOrder(res))
    setLoading(false);
  };
  useEffect(() => {
    if (checkoutState.order) {
      setLoading(false)
    } else if (route?.params?.id) {
      confirmCheckoutAction();
    }
  }, [route]);
  return (
    <ScreenWrapper statusBarColor={AppColors.loader}>
      <View style={styles.mainViewContainer}>
        {loading ? (
          <>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.login}>Confirm Checkout</Text>
          </>
        ) : (
          <>
            <Text style={{fontSize: 25, color: 'white', marginBottom: 150}}>
              Order Confirmed!
            </Text>
            <View style={styles.actionGroup}>
              <Button
                title="View my Order"
                onPress={() => dispatch(checkoutActions.closeCheckout())}
              />
            </View>
          </>
        )}
      </View>
    </ScreenWrapper>
  );
}
