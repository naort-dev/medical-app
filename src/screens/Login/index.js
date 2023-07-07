import React, {useState, useRef, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import Location from '../../components/Location';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import {showMessage} from 'react-native-flash-message';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sendOTP, authorizeOTP, updateUser} from '../../backend/Auth';
import {getAge} from '../../utills/Methods';
import PinImg from '../../assets/images/pin.png';
import LoginImg from '../../assets/images/login.png';
import {height} from 'react-native-dimension';
import OTPForm from '../../components/OTPForm';
import SignupForm from '../../components/SignupForm';
import {
  login,
  selectStoreAction,
  setAnalayticsProfileId,
} from '../../Redux/Actions/Auth';
import {analyitcs_uid, createOrUpdateAnalyticsProfile} from '../../backend/Analytics';
import {s3Service} from '../../backend/StoreFront';
import { SelectStore } from '../App/selectStore';

const STEP = {
  LOGIN: 0,
  OTP: 1,
  PROFILE: 2,
  SELECT_STORE: 3,
};

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
export default function Dashboard({navigation, route}) {
  const dispatch = useDispatch();
  const {company} = useSelector((state) => state.Auth);
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(STEP.LOGIN);
  const [error, setError] = useState('');
  const [validation, setValidation] = useState(false);
  const [signupContent, setSignupContent] = useState({});
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const loadStorfront = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigation.navigate('TabScreens');
    }
    const s3 = new s3Service();
    const body = await s3.getSignupFile('', 'signup');
    // console.log(body)
    // const body = {
    //   header_img_url: '',
    //   title: 'Create an account!',
    //   subtitle: 'Enter the information to create your account.',
    //   first_name_title: 'First Name',
    //   last_name_title: 'Last Name',
    //   email_title: 'Email',
    //   dob_title: 'Date of Birth',
    //   med_title: 'Do you have a medical card?',
    //   button_title: 'Create an account',
    //   age_error: 'You must be 21 or older to use this app.',
    // };
    setSignupContent(body);
    if (route?.params?.login) {
      goToSelectStore();
    }
  };
  useEffect(() => {
    loadStorfront();
  }, []);
  const handleOTP = () => {
    //check with api
    if (true) {
      loginMethod();
    }
  };

  useInterval(
    () => {
      setCount(count - 1);
      if (count === 1) {
        setIsRunning(false);
      }
    },
    isRunning ? 1000 : null,
  );

  const submitPhone = async () => {
    //api call
    //pull up otp input
    setCount(60);
    setIsRunning(true);
    await sendOTP(phone);
    setStep(STEP.OTP);
  };
  const submitProfile = async () => {
    if (
      !profile.first_name ||
      !profile.last_name ||
      !profile.dob ||
      !(getAge(profile.dob) >= 22)
    ) {
      setValidation(true);
    } else {
      const user = await updateUser(profile);
      setUser(user);
      goToSelectStore(user);
    }
  };
  const goToSelectStore = (userInfo = null) => {
    if (company.stores.length === 1) {
      selectStore(company.stores[0], userInfo);
    } else {
      setStep(STEP.SELECT_STORE);
    }
  };
  const loginSuccess = async (user) => {
    await AsyncStorage.setItem('phone', user.phone);
    await AsyncStorage.setItem('isLoggedIn', 'true');
    dispatch(login(user));

    await setTimeout(() => {
      if (!route?.params?.login) {
        showMessage({
          message: 'Success',
          description: 'Successfully logged In',
          type: 'success',
        });
      }
      navigation.navigate('TabScreens');
      //dispatch(login({ userName: 'John Doe' }));
      setStep(STEP.LOGIN);
    }, 1500);
  };
  const loginMethod = async () => {
    try {
      const {access_token, refresh_token, user} = await authorizeOTP(
        phone,
        value,
      );
      console.log(access_token, refresh_token, user, company);
      await AsyncStorage.setItem(
        'Token',
        JSON.stringify({access_token, refresh_token}),
      );
      if (user.first_name && user.last_name && user.dob) {
        setUser(user);
        goToSelectStore(user);
      } else {
        setProfile(user);
        setStep(STEP.PROFILE);
      }
    } catch (e) {
      console.error(e)
      showMessage({
        message: 'Error',
        description: 'OTP Code is incorrect.',
        type: 'error',
      });
    }
  };
  const selectStore = async (item, userInfo) => {
    console.log(item);
    await AsyncStorage.setItem('STORE_ID', item.id ?? item._id);
    const analyticsProfileId = user.analytics_profile_id || analyitcs_uid();
    await createOrUpdateAnalyticsProfile(analyticsProfileId);
    await AsyncStorage.setItem('ANALYTICS_PROFILE_ID', analyticsProfileId);
    dispatch(selectStoreAction(item));
    dispatch(setAnalayticsProfileId(analyticsProfileId));
    loginSuccess(userInfo || user);
  };
  const phoneInput = useRef(null);
  const [value, setValue] = useState('');
  const LocationItem = ({item}) => {
    return (
      <View>
        <Location
          locationName={item.name}
          address={
            item?.address?.street +
            ', ' +
            item?.address?.city +
            ', ' +
            item?.address?.state +
            ' ' +
            item?.address?.zipcode
          }
          image={item?.photos ? item?.photos[0] : null}
          open={null}
          onPress={() => selectStore(item)}
        />
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={AppColors.black} scrollEnabled={step !== STEP.SELECT_STORE}>
      {step > STEP.LOGIN && step < STEP.SELECT_STORE && (
        <View style={styles.iconView}>
          <AntDesign
            name={'arrowleft'}
            size={20}
            color={AppColors.mainText}
            onPress={() => setStep(step - 1)}
          />
        </View>
      )}
      {step === STEP.SELECT_STORE && (
        <SelectStore stores={company.stores || []} onSelect={selectStore}/>
      )}
      {step === STEP.PROFILE && (
        <View style={styles.mainViewContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={LoginImg}
              resizeMode="cover"
              style={styles.backgroundImage}
            />
          </View>
          <Text style={styles.title}>{signupContent.title}</Text>
          <Text style={styles.description}>{signupContent.subtitle}</Text>
          <View style={styles.viewContainer}>
            <SignupForm
              profile={profile}
              setProfile={setProfile}
              content={signupContent}
              validation={validation}
            />
            <View style={styles.submit}>
              <Button
                title={signupContent.button_title}
                onPress={submitProfile}
              />
            </View>
            <Text style={styles.footerText} />
          </View>
        </View>
      )}
      {step === STEP.LOGIN && (
        <View style={styles.mainViewContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={LoginImg}
              resizeMode="cover"
              style={styles.backgroundImage}
            />
          </View>
          <Text style={styles.title}>{signupContent.title}</Text>
          <Text style={styles.description}>
            Please enter your registered phone number to proceed.
          </Text>
          <View style={styles.viewContainer}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phone}
              defaultCode="US"
              layout="first"
              onChangeText={(text) => {
                setPhone(text);
              }}
              containerStyle={{height: height(7), padding: 0, color: 'white'}}
              textInputStyle={{padding: height(0), color: 'white'}}
              codeTextStyle={{color: 'white'}}
              textContainerStyle={{
                backgroundColor: AppColors.navbar,
                color: 'white',
              }}
              inputComponent={
                <TextInput
                  type="tel"
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                  dataDetectorTypes="phoneNumber"
                  selectionColor="white"
                />
              }
              // withDarkTheme
              autoFocus
            />
            <View style={styles.submit}>
              <Button
                title="Next"
                disabled={phone.length !== 10}
                onPress={submitPhone}
              />
            </View>
            <Text style={styles.footerText} />
          </View>
        </View>
      )}
      {step === STEP.OTP && (
        <View style={styles.mainViewContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={PinImg}
              resizeMode="cover"
              style={styles.backgroundImage}
            />
          </View>
          <Text style={styles.title}>OTP</Text>
          <Text style={styles.description}>
            Enter 6-digit code sent to you.
          </Text>
          <View style={styles.viewContainer}>
            <OTPForm value={value} setValue={setValue} />
            <View style={styles.submit}>
              <Button title="Submit" onPress={handleOTP} />
            </View>
            <Text style={styles.login}> {error}</Text>

            <Text style={styles.footerText}>I didn't receive a code</Text>
            <TouchableOpacity onPress={submitPhone} disabled={count}>
              <Text style={styles.resendLink}>
                Resend OTP{count ? ` (${count})` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
}
