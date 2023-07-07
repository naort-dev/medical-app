import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import AppColors from '../../utills/AppColors';
import styles from './styles';

const Button = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  loaderColor = AppColors.loader,
  activeOpacity = 0.7,
  containerStyle = {},
  textStyle = {},
  small = false,
  active = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={activeOpacity}
      style={[
        active ? styles.container : styles.inactiveContainer,
        containerStyle,
        small ? styles.small : {},
      ]}>
      {isLoading ? (
        <ActivityIndicator color={loaderColor} size="large" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
