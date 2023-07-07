import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: width(100),
    backgroundColor: AppColors.navbar,
    padding: width(2),
  },
  image: {
    height: width(12),
    width: width(12),
    borderRadius: width(100),
  },
  categoryView: {
    margin: width(2),
    paddingBottom: width(2),
    paddingRight: width(6),
    paddingLeft: width(6),
    paddingTop: 0,
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: AppColors.mainText,
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
