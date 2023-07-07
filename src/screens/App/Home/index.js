import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {height} from 'react-native-dimension'; // width
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import OneSignal from 'react-native-onesignal';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import Logo from '../../../assets/images/logo.png';
import SocialIcon from '../../../components/SocialIcon';
import WeedCategory from '../../../components/WeedCategory';
import {setStoreFront} from '../../../Redux/Actions/Config';
import ProductCard from '../../../components/ProductCard';
import ProductModal from '../../../components/ProductModal';
import WebViewModal from '../../../components/WebViewModal';
import {s3Service} from '../../../backend/StoreFront';
import {getAssetUrl} from '../../../utills/Methods';
import {getProduct} from '../../../backend/Catalog';
import {getImgAssetUrl} from '../../../backend/Config';
import styles from './styles';
import {recordAnalytics} from '../../../backend/Analytics';
import {EVENT} from '../../../utills/Constants';
import ModalSmaller from '../../../components/ModalSmaller';
import {clearCart} from '../../../Redux/Actions/Cart';
import appConfig from 'app/config'

//import {store, useGlobalState} from 'state-pool';

function Home({navigation, cart}) {
  const storefront = useSelector((state) => state.Config.storefront);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {company, storeInfo} = useSelector((state) => state.Auth);
  const assetUrl = getImgAssetUrl(company.handle);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (appConfig.ONESIGNAL_APP_ID) {
      OneSignal.setAppId(appConfig.ONESIGNAL_APP_ID);
      OneSignal.setLogLevel(6, 0);
      // getDevice();
      // OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
      // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
      // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
      OneSignal.promptForPushNotificationsWithUserResponse((response) => {
        console.log('Prompt response:', response);
      });
      OneSignal.setNotificationWillShowInForegroundHandler(
        (notifReceivedEvent) => {
          console.log(
            'OneSignal: notification will show in foreground:',
            notifReceivedEvent,
          );
          // let notif = notifReceivedEvent.getNotification();

          // const button1 = {
          //     text: "Cancel",
          //     onPress: () => { notifReceivedEvent.complete(); },
          //     style: "cancel"
          // };

          // const button2 = { text: "Complete", onPress: () => { notifReceivedEvent.complete(notif); }};

          // Alert.alert("Complete notification?", "Test", [ button1, button2], { cancelable: true });
        },
      );
      OneSignal.setNotificationOpenedHandler((notification) => {
        console.log('OneSignal: notification opened:', notification);
      });
      OneSignal.setInAppMessageClickHandler((event) => {
        console.log('OneSignal IAM clicked:', event);
      });
      OneSignal.setInAppMessageLifecycleHandler({
        onWillDisplayInAppMessage: (message) => {
          console.log('OneSignal: will display IAM: ', message.messageId);
        },
        onDidDisplayInAppMessage: (message) => {
          console.log('OneSignal: did display IAM: ', message.messageId);
        },
        onWillDismissInAppMessage: (message) => {
          console.log('OneSignal: will dismiss IAM: ', message.messageId);
        },
        onDidDismissInAppMessage: (message) => {
          console.log('OneSignal: did dismiss IAM: ', message.messageId);
        },
      });
      OneSignal.addEmailSubscriptionObserver((event) => {
        console.log('OneSignal: email subscription changed: ', event);
      });
      OneSignal.addSMSSubscriptionObserver((event) => {
        console.log('OneSignal: SMS subscription changed: ', event);
      });
      OneSignal.addSubscriptionObserver((event) => {
        console.log('OneSignal: subscription changed:', event);
      });
      // OneSignal.addEventListener('received', onReceived);
      // OneSignal.addEventListener('opened', onOpened);
      // OneSignal.addEventListener('ids', onIds);
      // return () => {
      //   OneSignal.removeEventListener('received', onReceived);
      //   OneSignal.removeEventListener('opened', onOpened);
      //   OneSignal.removeEventListener('ids', onIds);
      // }
    }
  }, []);
  const onReceived = (notification) => {
    console.log('Notification received: ', notification);
  };

  const onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  const onIds = (device) => {
    console.log('Device info: ', device);
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      'The cart is not empty.',
      'Changing stores will clear your cart',
      [
        // The "Yes" button
        {
          text: 'Okay',
          onPress: () => {
            dispatch(clearCart());
            // navigation.getParent().navigate('SelectStores');
            navigation.getParent("RootNavigator").navigate("SelectStores")
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'Cancel',
        },
      ],
    );
  };

  const backToStore = () => {
    if (cart.items.length === 0) {
      // navigation.getParent().navigate('SelectStores');
      navigation.getParent("RootNavigator").navigate("SelectStores")
    } else {
      showConfirmDialog();
    }
  };

  useEffect(() => {
    const loadStorefront = async () => {
      setLoading(true);
      const s3 = new s3Service();
      const body = await s3.getFile(true, 'storefront');
      let tempProducts = [];
      for (let index = 0; index < body.sections.length; index++) {
        const section = body.sections[index];
        if (section._sectionID === 'products') {
          let emptyList = [];
          for (let i = 0; i < section?.products?.length; i++) {
            emptyList.push({});
          }
          tempProducts[index] = emptyList;
        }
      }
      setProducts([...tempProducts]);
      dispatch(setStoreFront(body));
      setLoading(false);
      for (let index = 0; index < body.sections.length; index++) {
        const section = body.sections[index];
        if (section._sectionID === 'products') {
          let tempList = tempProducts[index];
          for (let i = 0; i < section?.products?.length; i++) {
            const product = await getProduct({
              id: section?.products[i],
            });
            tempList[i] = product;
          }
          tempProducts[index] = [...tempList];
          setProducts([...tempProducts]);
        }
      }
    };
    loadStorefront();
  }, [dispatch]);
  const Recommended = ({item}) => {
    const openProduct = async (productItem) => {
      setSelectedProduct(productItem);
      console.log(productItem);
      recordAnalytics(EVENT.VIEW_PRODUCT, {
        // brand_id: productItem.brand.id,
        product_id: productItem.id,
        category_id: productItem.category.id,
        attributes: 'home',
      });
      setTimeout(() => {
        setModalVisible(true);
      }, 600);
    };
    return (
      <ProductCard
        item={item}
        isLoading={loading}
        navigation={navigation}
        onPress={() => openProduct(item)}
      />
    );
  };
  const CategoriesOfWeed = ({item}) => {
    return (
      <WeedCategory
        name={item.title}
        image={getAssetUrl(item.image, assetUrl)}
        onPress={() => {
          console.log(item.id);
          navigation.navigate('MenuScreen', {
            screen: 'Category',
            params: {
              category: item.id,
              categoryLabel: item.title,
            },
          });
        }}
        isLoading={loading}
      />
    );
  };
  const SocialIconComponent = ({item}) => {
    return <SocialIcon item={item} isLoading={loading} />;
  };
  const SocialSections = ({section}) => (
    <View style={styles.screenView}>
      <FlatList
        data={section.links}
        renderItem={SocialIconComponent}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
  const CategoriesSection = ({section}) => (
    <View style={{...styles.categorySection}}>
      <FlatList
        data={section.categories}
        renderItem={CategoriesOfWeed}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
  const ImageSection = ({section}) => {
    const [imageModalVisible, setImageModalVisible] = useState(false);
    return (
      <TouchableOpacity
        onPress={() => {
          if (section.destination.includes(`${appConfig.APP_URL_SCHEME}://`)) {
            // Linking.openURL(section.destination);
            if (section.destination.includes('menu?category')) {
              const categorySection = storefront.sections.find(
                (item) => item._sectionID === 'categories',
              );
              navigation.navigate('Category', {
                category: section.destination.split('=')[1],
                categoryLabel: categorySection.categories.find(
                  (category) =>
                    category.id === section.destination.split('=')[1],
                ).title,
              });
            } else {
              Linking.openURL(section.destination);
            }
          } else {
            setImageModalVisible(true);
          }
        }}>
        <View style={styles.screenView}>
          <SkeletonContent
            isLoading={loading}
            boneColor="rgba(225, 233, 238, 0.1)"
            highlightColor="rgba(242, 248, 252, 0.1)"
            containerStyle={
              section.title ? styles.discountView : styles.shopifyView
            }>
            {/* <View style={styles.imageWrapper}> */}
            <Image
              source={{uri: getAssetUrl(section.image, assetUrl)}}
              resizeMode={section.title ? 'stretch' : 'contain'}
              style={section.title ? styles.discountImage : styles.shopifyImage}
            />
            {/* </View> */}
            <Text style={styles.discountText1}>{section.title}</Text>
            <Text style={styles.discountText2}>{section.subtitle}</Text>
          </SkeletonContent>
          <WebViewModal
            isVisible={imageModalVisible}
            onClose={() => setImageModalVisible(false)}
            url={getAssetUrl(section.destination, assetUrl)}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const ProductsSection = ({section, index}) => {
    return (
      <View style={styles.screenView}>
        <Text style={[styles.headerText2, {paddingVertical: height(0.5)}]}>
          {section.title}
        </Text>
        <FlatList
          data={products[index]}
          renderItem={Recommended}
          keyExtractor={(item) => item?.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <ProductModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          navigation={navigation}
          selectedProduct={selectedProduct}
        />
      </View>
    );
  };
  const BannerSection = ({section}) => (
    <SkeletonContent isLoading={loading}>
      <View style={styles.bannerView}>
        <Text style={styles.bannerText1}>{storefront?.title}</Text>
        <Text style={styles.bannerText2}>{storefront?.subtitle}</Text>
      </View>
    </SkeletonContent>
  );
  const StoreInfoSection = () => (
    <View style={{...styles.screenView, ...styles.storeInfoSection}}>
      <View>
        <Text style={styles.storeTitle}>{storeInfo.name}</Text>
      </View>

      <TouchableOpacity onPress={() => backToStore()}>
        <View style={styles.backToStore}>
          <Fontisto
            name="map-marker-alt"
            size={20}
            color="white"
            style={{marginRight: 10}}
          />
          <Text style={styles.storeTitle}>Change Store</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const sectionComponents = {
    banner: BannerSection,
    categories: CategoriesSection,
    image: ImageSection,
    products: ProductsSection,
    social: SocialSections,
  };
  return (
    <ScreenWrapper scrollEnabled>
      <View style={styles.mainViewContainer}>
        {/* <ModalSmaller /> */}
        <View style={styles.headerView}>
          <View>
            <Image source={Logo} resizeMode="contain" style={styles.logoImg} />
          </View>
        </View>
        <StoreInfoSection />
        {storefront?.sections?.map((section, index) => {
          const SectionComponent = sectionComponents[section._sectionID];
          if (SectionComponent) {
            return <SectionComponent section={section} index={index} />;
          }
          return <></>;
        })}

        {/*  */}
        {/* <View style={[styles.screenView,{paddingRight:width(5)}]}>
          <Text style={styles.headerText2}>Store Location</Text>
          <View style={styles.storeLocationView}>
            <View style={styles.locationTextView}>
              <Text style={styles.locationText1}>SKYWAY/SEATAC</Text>
              <View style={styles.iconView}>
                <Ionicons name="pin" size={18} color={AppColors.secondaryText} style={styles.icon}/>
                <Text style={styles.storeLocationText}>12833 MARTIN LUTHER KING JR WAY S, SEATTLE, WA 98178</Text>
              </View>
              <View style={styles.iconView}>
                <Feather name="phone" size={18} color={AppColors.secondaryText} style={styles.icon}/>
                <Text style={styles.storeLocationText}>(206) 258-3331</Text>
              </View>
              <View style={styles.iconView}>
                <Feather name="clock" size={18} color={AppColors.secondaryText} style={styles.icon}/>
                <Text style={styles.storeLocationText}>MON - SAT: 8AM - 11 PM SUN & HOLIDAY: 8AM - 10 PM</Text>
              </View>
            </View>
            <View style={styles.mapImageView}>
              <Image
                source={Map}
                resizeMode="contain"
                style={styles.mapImage}
              />
            </View>
          </View>
        </View> */}
      </View>
    </ScreenWrapper>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, null)(Home);
