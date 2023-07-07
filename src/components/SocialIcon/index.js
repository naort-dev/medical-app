import React from 'react';
import {Text, TouchableOpacity, Linking, Image} from 'react-native';
import {getAssetUrl} from '../../utills/Methods';
import {getImgAssetUrl} from '../../backend/Config';

import styles from './styles';
import {useSelector} from 'react-redux';

const SocialIcon = ({item, isLoading, containerStyle = {}}) => {
  const {company} = useSelector((state) => state.Auth);
  return (
    <TouchableOpacity
      style={[styles.categoryView, containerStyle]}
      activeOpacity={0.8}
      onPress={() => item.url && Linking.openURL(item.url)}>
      <Image
        source={{uri: getAssetUrl(item.icon, getImgAssetUrl(company.handle))}}
        resizeMode="contain"
        style={styles.image}
      />
      {item.label ? <Text style={styles.name}>{item.label}</Text> : null}
      {/* </SkeletonContent> */}
    </TouchableOpacity>
  );
};

export default SocialIcon;
