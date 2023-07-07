import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {View, Text, ActivityIndicator, Button, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';

export default function CheckoutRedirect({navigation, route}) {
  const {redirectUri, checkoutId} = route.params;

  return (
    <ScreenWrapper>
      <View style={styles.mainViewContainer}>
        <Text style={styles.login}>
          Please complete checkout in your browser
        </Text>
        <ActivityIndicator size="large" color="#fff" />
        <View style={styles.actionGroup}>
          <View style={styles.button}>
            <Button
              title="Finish Checkout"
              onPress={() => {
                Linking.openURL(redirectUri);
              }}
            />
          </View>
          <Button
            style={styles.button}
            color="#f194ff"
            title="Cancel Order"
            onPress={() => {
              navigation.navigate('CheckoutLoading', {
                text: 'Cancelling your Order...',
                isCancelOrder: true,
                orderId: checkoutId,
              });
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
