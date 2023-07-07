import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../utills/AppColors';

const styles = StyleSheet.create({
  tabBarStyle: {
    height: height(12),
    paddingBottom: height(4),
    paddingTop: height(0.5),
    backgroundColor: AppColors.navbar,
    borderTopWidth: height(0),
  },
  tabBarLabel: {
    fontSize: width(3.5),
  },
});

export default styles;
