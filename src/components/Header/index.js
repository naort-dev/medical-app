import React from 'react';
import {Text, View, Image} from 'react-native';
import Logo from '../../assets/images/logo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppColors from '../../utills/AppColors';
import styles from './styles';
const Header = ({
  title,
  onPress,
  iconName = 'arrowleft',
  containerStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {iconName ? (
        <View style={styles.iconView}>
          <AntDesign
            name={iconName}
            size={20}
            color={AppColors.mainText}
            onPress={onPress}
          />
        </View>
      ) : null}
      {/* {title ? (
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : null} */}
      <View style={styles.logoContainer}>
        {/* {search ? `"${search}"` : 'Menu'} */}
        <View>
          <Image source={Logo} resizeMode="contain" style={styles.logoImg} />
        </View>
      </View>
    </View>
  );
};

export default Header;
