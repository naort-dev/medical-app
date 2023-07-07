import React from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import styles from './styles';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
const WeedCategory = ({
  name,
  image,
  isLoading,
  onPress,
  containerStyle = {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.categoryView, containerStyle]}
      activeOpacity={0.8}
      onPress={onPress}>
      <SkeletonContent isLoading={isLoading}>
        {name ? <Text style={styles.name}>{name.toUpperCase()}</Text> : null}
      </SkeletonContent>
    </TouchableOpacity>
  );
};

export default WeedCategory;
