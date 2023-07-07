import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
  },
  shadow: {
    height: height(10),
    width: width(100),
    position: 'absolute',
    top: -height(7),
  },
  modalInnerContainer: {
    backgroundColor: AppColors.containerBackground,
    borderTopRightRadius: width(7),
    borderTopLeftRadius: width(7),
    paddingBottom: height(2),
    alignItems: 'center',
  },
});
export default styles;
