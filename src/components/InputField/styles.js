import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {width} from 'react-native-dimension';

const styles = StyleSheet.create({
  formInput: {
    width: width(85),
    backgroundColor: AppColors.navbar,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'white',
    borderWidth: 1,
    borderColor: 'gray',
  },
});
export default styles;
