import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';
const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    marginTop: height(2),
  },
  search: {
    marginTop: 0,
    marginBottom: height(2),
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
  productWrapper: {
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});
export default styles;
