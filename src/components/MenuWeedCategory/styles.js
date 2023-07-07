import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  discountView: {
    width: width(45),
    height: height(13),
    justifyContent: 'flex-end',
    borderRadius: width(2),
    paddingBottom: height(1),
    paddingLeft: width(2),
    marginRight: width(2),
    marginLeft: width(2),
    marginBottom: height(1),
    backgroundColor: AppColors.black,
    borderWidth: 2,
    borderColor: AppColors.border,
    overflow: 'hidden',
  },
  discountImage: {
    width: width(45),
    height: height(13),
    position: 'absolute',
    borderRadius: width(2),
    top: 30,
    left: 30,
  },
  discountText1: {
    color: AppColors.white,
    fontSize: width(4.5),
    lineHeight: height(3),
    position: 'absolute',
    top: 5,
    left: 5,
    fontWeight: 'bold',
  },
});

export default styles;
