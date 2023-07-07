import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  discountView: {
    width: width(45),
    height: height(18),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: width(2),
    marginRight: width(2),
    marginLeft: width(2),
    marginVertical: height(1),
    // backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: width(0.2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.0,
    elevation: 2,
  },
  discountImage: {
    width: width(20),
    height: width(20),
  },
  discountText1: {
    paddingHorizontal: width(3),
    textAlign: 'center',
    color: AppColors.mainText,
    fontSize: width(4),
    lineHeight: height(3),
    fontWeight: 'bold',
  },
});

export default styles;
