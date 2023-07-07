import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flexDirection: 'row',
    paddingHorizontal: width(5),
    marginTop: height(2.5),
  },
  mainView: {
    flex: 1,
    height: height(5),
    borderRadius: width(10),
    borderWidth: 0.5,
    borderColor: AppColors.detailBorder,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.detailBackground,
    paddingLeft: width(5),
    padding: 0,
  },
  Search: {
    color: AppColors.mainText,
    fontSize: height(1.8),
  },
  cancelView: {
    paddingHorizontal: width(5),
    height: height(5),
    justifyContent: 'center',
  },
  cancel: {
    color: AppColors.secondaryText,
  },
});

export default styles;
