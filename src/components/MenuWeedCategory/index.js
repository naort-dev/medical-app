import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
const MenuWeedCategory = ({
  name,
  image,
  onPress,
  isLoading = false,
  containerStyle = {},
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <SkeletonContent
        isLoading={isLoading}
        containerStyle={styles.discountView}>
        {name ? <Text style={styles.discountText1}>{name}</Text> : null}
        {image ? (
          <Image
            source={{uri: image}}
            resizeMode="contain"
            style={styles.discountImage}
          />
        ) : null}
      </SkeletonContent>
    </TouchableOpacity>
  );
};

export default MenuWeedCategory;
