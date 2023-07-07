import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AppColors from '../../utills/AppColors';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';

const Location = ({
  image,
  locationName,
  address,
  open,
  onPress,
  containerStyle = {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.loacationView, containerStyle]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Image
        source={{uri: image}}
        resizeMode="cover"
        style={styles.locationImage}
      />
      <View style={styles.adressView}>
        <View style={styles.innerAdressView}>
          <View style={styles.starIconView}>
            <Entypo name="star" size={20} color={AppColors.locationStar} />
            <Text style={styles.discountText1}>{locationName}</Text>
          </View>
          <Text style={styles.storeLocationText}>{address}</Text>
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
    </TouchableOpacity>
  );
};

export default Location;
