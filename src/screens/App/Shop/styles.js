import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
  },
  headerView: {
    width: width(100),
    alignItems: 'center',
    paddingHorizontal: width(2),
    backgroundColor: AppColors.background,
    paddingVertical: height(1),
  },
  headerText: {
    color: AppColors.mainText,
    fontSize: width(6),
    lineHeight: height(4),
    fontWeight: 'bold',
    paddingHorizontal: width(3),
    paddingBottom: height(1),
  },
});
export default styles;
