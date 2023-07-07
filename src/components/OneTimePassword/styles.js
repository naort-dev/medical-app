import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';

const styles = StyleSheet.create({
  popupbox: {
    backgroundColor: AppColors.background,
    width: width(100),
    height: height(100),
    top: 0,
    left: 0,
  },

  input: {
    height: 40,
    width: width(70),
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: AppColors.mainText,
  },
});
