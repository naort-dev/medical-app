import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerView: {
    width: width(100),
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
    alignSelf: 'flex-start',
  },
  logoContainer: {
    width: width(100),
    backgroundColor: AppColors.background,
    paddingVertical: height(1),
    paddingRight: 15,
    paddingTop: height(2),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuList: {},
  categoryView: {
    justifyContent: 'space-between',
  },
  logoImg: {
    width: width(80),
    height: 80,
  },
});
export default styles;
