import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {width, height} from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(1.5),
    backgroundColor: AppColors.button,
    height: height(6),
    width: width(80),
    alignSelf: 'center',
    marginTop: height(2),
  },
  small: {
    width: width(30),
  },
  inactiveContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(1.5),
    backgroundColor: AppColors.detailBackground,
    height: height(6),
    width: width(30),
    alignSelf: 'center',
    marginTop: height(2),
  },
  text: {
    color: AppColors.buttonText,
    fontSize: width(4),
  },
});
export default styles;
