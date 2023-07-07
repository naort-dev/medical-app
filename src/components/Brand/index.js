import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
const Brand = ({
  name,
  image,
  onPress,
  isLoading = false,
  containerStyle = {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.discountView, containerStyle]}
      activeOpacity={0.9}
      onPress={onPress}>
      <SkeletonContent isLoading={isLoading}>
        {image ? (
          <Image
            source={{uri: image}}
            resizeMode="contain"
            style={styles.discountImage}
          />
        ) : null}
        {name ? <Text style={styles.discountText1}>{name}</Text> : null}
      </SkeletonContent>
    </TouchableOpacity>
  );
};

export default Brand;
