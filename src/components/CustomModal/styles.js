import {StyleSheet} from 'react-native';
import {width, height} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  headingText: {
    fontSize: width(5),
    fontWeight: 'bold',
    color: AppColors.appPrimary,
    marginBottom: height(3.5),
    marginTop: height(2),
    textAlign: 'center',
  },
  subHeadingText: {
    fontSize: width(3.7),
    color: AppColors.darkGray,
    marginVertical: height(2.2),
    textAlign: 'center',
  },
  buttonContainer: {
    width: width(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height(3.5),
  },
  picOption: {
    alignItems: 'center',
  },
  picOptionText: {
    fontSize: width(3.85),
    textAlign: 'center',
    marginTop: height(1),
  },
  optionIcon: {
    height: height(8.5),
    width: height(8.5),
    resizeMode: 'contain',
    marginTop: height(1),
    tintColor: AppColors.appPrimaryBlue,
  },
  iconContainer: {
    paddingVertical: height(2),
    marginRight: width(0.5),
  },
  btn: {
    width: width(80),
    marginVertical: height(3),
    marginBottom: height(5),
  },
  addbutton: {
    marginTop: height(2),
  },
});
export default styles;
