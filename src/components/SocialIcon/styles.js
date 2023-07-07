import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  image: {
    height: width(12),
    width: width(12),
    backgroundColor: 'black',
    color: 'white',
    opacity: 1,
    borderRadius: width(10),
    tintColor: 'white',
  },
  categoryView: {
    margin: width(3),
    alignItems: 'center',
  },
  name: {
    color: AppColors.mainText,
    fontSize: width(4),
    lineHeight: height(2.7),
    textAlign: 'center',
    paddingTop: height(1),
  },
});

export default styles;
