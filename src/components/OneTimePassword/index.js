import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import Button from '../Button';
import styles from './styles';

const OTPPopup = (props) => {
  [otp, setOtp] = useState('');

  const handleOTP = () => {
    //check with api
    if (true) {
      props.handleLogin;
    } else {
      null;
    }
  };
  return (
    <View className="popup-box">
      <View className="box">
        <TextInput
          style={styles.input}
          onChangeText={setOtp}
          value={otp}
          keyboardType="numeric"
        />
        <Button title="Submit" onPress={handleOTP} />
      </View>
    </View>
  );
};

export default OTPPopup;
