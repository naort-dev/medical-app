import React from 'react';
import {Text, View, Image, ScrollView, Linking} from 'react-native';
import LocationMap from '../../assets/images/map.png';
import {ScreenWrapper} from '../ScreenWrapper';
import styles from './styles';
import AppColors from '../../utills/AppColors';
import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

import Hours from '../Hours';
import {width} from 'react-native-dimension';
const LocationDetails = ({
  locationImage,
  locationName,
  phone,
  location,
  address,
  open,
  mapImage,
  hours,
  about,
  onBackIconPress,
}) => {
  return (
    <ScreenWrapper
      transclucent
      barStyle="light-content"
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        {/* <View style={styles.iconView}>
          <Ionicons
            name="arrow-back-circle-sharp"
            size={50}
            color={AppColors.gray}
            style={styles.backIcon}
            onPress={onBackIconPress}
          />
        </View> */}
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View style={styles.imageView}>
            <Image
              source={locationImage ? {uri: locationImage} : LocationMap}
              resizeMode="cover"
              style={styles.backgroundImage}
            />
          </View>
          <View style={styles.adressView}>
            <View style={styles.innerAdressView}>
              <View style={styles.starIconView}>
                <Text style={styles.discountText1}>{locationName}</Text>
              </View>
              <Text style={styles.storeLocationText}>{address}</Text>
            </View>
            <View>
              {phone && (
                <FontAwesomeIcons
                  name="phone"
                  size={30}
                  color={AppColors.buttonText}
                  style={{marginRight: width(3)}}
                  onPress={() => {
                    Linking.openURL(`tel:${phone}`);
                  }}
                />
              )}
            </View>

            {/* <View style={styles.openView}>
              <View style={styles.innerOpenView}>
                <Text style={styles.openText}>{open.status ? 'open' : 'closed'}</Text>
              </View>
              <View style={styles.innerInnerOpenView}>
                <Text style={styles.storeLocationText}>{open.status ? 'Closes at ' + open.closingTime : 'Opens at ' + open.openingTime}</Text>
              </View>
            </View> */}
          </View>
          <View style={styles.locationMapView}>
            {location && (
              <MapView
                initialRegion={{
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.000922,
                  longitudeDelta: 0.000421,
                }}
                style={{
                  flex: 1,
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                }}
                scrollEnabled={false}
                onPress={() => {
                  Linking.openURL(
                    `http://maps.google.com/maps?q=&layer=c&cbll=${location.lat},${location.lng}&cbp=11,0,0,0,0`,
                  );
                }}
              />
            )}
          </View>
          {/* <View style={styles.locationMapView}>
            <Image
              source={mapImage}
              resizeMode="contain"
              style={styles.locationMap}
            />
          </View> */}
          <View style={styles.about}>
            <Text style={styles.headingText}>About</Text>
            <Text style={styles.storeLocationText}>{about}</Text>
          </View>
          <Hours hours={hours} />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default LocationDetails;
