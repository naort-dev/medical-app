import {StyleSheet} from 'react-native';
import {width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 20,
  },
  checkboxGroup: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkboxLabel: {
    color: AppColors.mainText,
  },
  checkbox: {
    alignSelf: 'center',
    borderWidth: 2,
    color: 'red',
  },
  formLabel: {
    color: AppColors.mainText,
    marginBottom: 10,
  },
  formInput: {
    width: width(85),
    backgroundColor: AppColors.navbar,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'white',
    borderWidth: 1,
    borderColor: 'gray',
  },
  errorText: {
    color: '#e00',
  },
});
export default styles;
