import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, FlatList} from 'react-native';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import styles from './styles';
import Header from '../../../components/Header';
import ProductInCart from '../../../components/ProductInCart';
import Order from '../../../components/Order';
import Button from '../../../components/Button';
import AppColors from '../../../utills/AppColors';
import {updateUser} from '../../../backend/Auth';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {width} from 'react-native-dimension';
import SignupForm from '../../../components/SignupForm';
import {getAge} from '../../../utills/Methods';
import {loadAllOrders} from '../../../backend/Catalog';
import ProductModal from '../../../components/ProductModal';
import Product from '../../../components/Products';
import {s3Service} from '../../../backend/StoreFront';
import {logout} from '../../../Redux/Actions/Auth';

function Profile({navigation}) {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.Auth);
  const [profile, setProfile] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [signupContent, setSignupContent] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [seletedProduct, setSelectedProduct] = useState(null);
  const [orders, setOrders] = useState({});
  useEffect(() => {
    (async () => {
      setLoading(true);
      setProfile(user);
      const res = await loadAllOrders();
      setOrders(res);
      setLoading(false);
    })();
  }, []);
  const logoutCallback = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    dispatch(logout());
    navigation.navigate('LoginStack');
    setLoading(false);
  };
  const loadStorfront = async () => {
    // s3Service
    const s3 = new s3Service();
    const body = await s3.getSignupFile('', 'signup');
    console.log('==================');
    console.log(body);
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
  };
  useEffect(() => {
    loadStorfront();
  }, []);
  // const signupContent = {
  //   "header_img_url": "",
  //   "title": "Create an account!",
  //   "subtitle": "Enter the information to create your account.",
  //   "first_name_title": "First Name",
  //   "last_name_title": "Last Name",
  //   "email_title": "Email",
  //   "dob_title":"Date of Birth",
  //   "med_title": "Do you have a medical card?",
  //   "button_title": "Create an account",
  //   "age_error": "You must be 21 or older to use this app."
  // }
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
      await AsyncStorage.setItem('Profile', JSON.stringify(user));
      setEditOpen(!editOpen);
    }
  };
  const CategoryProduct = ({item}) => {
    const openProduct = async (item) => {
      setSelectedProduct(item.product);
      console.log(item);
      // recordAnalytics(EVENT.VIEW_PRODUCT, {product_id, })
      setTimeout(() => {
        setModalVisible(true);
      }, 600);
    };
    return (
      <View>
        <Product
          item={item.product}
          modalVisible={modalVisible}
          onPress={() => openProduct(item)}
          isLoading={loading}
        />
      </View>
    );
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => {
        return (
          <View style={{backgroundColor: AppColors.background}}>
            <Header title={'Profile'} onPress={() => navigation.goBack()} />
          </View>
        );
      }}
      scrollEnabled>
      <View style={styles.mainViewContainer}>
        <View style={styles.profile}>
          <View style={styles.profileInfo}>
            <FontAwesome name="user" color={'white'} size={width(20)} />
            <View style={styles.profileField}>
              <Text style={styles.profileLabel}>
                {profile.first_name} {profile.last_name}
              </Text>
              <Text style={styles.profileValue}>{profile.phone}</Text>
            </View>
          </View>
          <View style={styles.profileField}>
            <Button
              title={'Log Out'}
              onPress={logoutCallback}
              small
              containerStyle={{backgroundColor: '#811'}}
            />
            <Button
              title={editOpen ? 'Close' : 'Edit'}
              onPress={() => setEditOpen(!editOpen)}
              small
            />
          </View>
        </View>
        {!editOpen && (
          <View>
            {Object.keys(orders?.active || {}).length > 0 && (
              <>
                <Text style={styles.title}>Active Orders</Text>
                {Object.keys(orders?.active).map((key) => (
                  <View key={key}>
                    <Text style={styles.dateTitle}>{key}</Text>
                    <View style={styles.profile}>
                      <FlatList
                        data={orders.active[key]}
                        renderItem={CategoryProduct}
                        keyExtractor={(item) => item.uuid}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>
                  </View>
                ))}
              </>
            )}
            <Text style={styles.title}>Recent Orders</Text>
            {Object.keys(orders?.past || {}).length > 0 && (
              <>
                {Object.keys(orders?.past).map((key) => (
                  <View key={key}>
                    <Text style={styles.dateTitle}>{key}</Text>
                    <View style={styles.profile}>
                      <FlatList
                        data={orders.past[key]}
                        renderItem={CategoryProduct}
                        keyExtractor={(item) => item.uuid}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>
                  </View>
                ))}
              </>
            )}
            {Object.keys(orders?.past || {}).length === 0 && (
              <Text style={styles.dateTitle}>No Orders</Text>
            )}
          </View>
        )}
        {editOpen && (
          <View style={styles.viewContainer}>
            <Text style={styles.title}>Edit Profile</Text>
            <SignupForm
              profile={profile}
              setProfile={setProfile}
              content={signupContent}
              validation={validation}
            />
            <View style={styles.submit}>
              <Button title={'Submit'} onPress={submitProfile} />
            </View>
          </View>
        )}
      </View>
      <ProductModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
        setSelectedProduct={setSelectedProduct}
        selectedProduct={seletedProduct}
      />
    </ScreenWrapper>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, null)(Profile);
