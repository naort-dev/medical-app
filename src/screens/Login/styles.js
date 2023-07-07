import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {width} from 'react-native-dimension';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 2,
    backgroundColor: AppColors.background,
    padding: 30,
  },
  imgContainer: {
    backgroundColor: AppColors.background,
  },
  viewContainer: {
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
  title: {
    color: AppColors.mainText,
    fontSize: 32,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: AppColors.secondaryText,
    fontSize: 12,
    marginBottom: 40,
  },
  submit: {
    paddingTop: 40,
  },
  footerText: {
    color: AppColors.secondaryText,
    fontSize: 12,
  },
  resendLink: {
    marginTop: 20,
    color: AppColors.secondaryText,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  iconView: {
    marginLeft: 20,
  },
});
export default styles;
