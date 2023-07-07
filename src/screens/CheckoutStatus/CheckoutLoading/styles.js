import {StyleSheet} from 'react-native';
import AppColors from '../../../utills/AppColors';
import {width} from 'react-native-dimension';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.background,
  },
  login: {
    color: AppColors.mainText,
  },
  input: {
    height: 40,
    width: width(70),
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: AppColors.mainText,
    color: 'black',
  },
  actionGroup: {
    position: 'absolute',
    bottom: 20,
  },
});
export default styles;
