import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../Redux/Actions/Auth';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import {showMessage} from 'react-native-flash-message';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [otpOpen, setOtpOpen] = useState(false);

  const toggleOtpPopup = () => {
    setOtpOpen(!otpOpen);
  };

  const loginMethod = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    dispatch(setLoaderVisible(true));
    await setTimeout(() => {
      showMessage({
        message: 'Success',
        description: 'Successfully logged In',
        type: 'success',
      });
      dispatch(setLoaderVisible(false));
      navigation.navigate('Home');
      //dispatch(login({ userName: 'John Doe' }));
    }, 1500);
  };
  return (
    <ScreenWrapper statusBarColor={AppColors.loader}>
      <View style={styles.mainViewContainer}>
        <Text> Login</Text>
        <Button title="Login" onPress={loginMethod} />
      </View>
    </ScreenWrapper>
  );
}
