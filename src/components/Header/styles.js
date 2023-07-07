import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width(100),
    paddingLeft: width(5),
    paddingRight: width(10),
    backgroundColor: AppColors.background,
    paddingTop: height(1),
    justifyContent: 'center',
  },
  title: {
    fontSize: width(5),
    lineHeight: height(2.7),
    color: AppColors.mainText,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  iconView: {
    // alignSelf: 'center',
    // justifyContent: 'flex-start',
    position: 'absolute',
    top: 60,
    left: 30,
    zIndex: 2000,
  },
  titleView: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: width(100),
    paddingHorizontal: width(5),
    backgroundColor: AppColors.background,
    paddingVertical: height(1),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoImg: {
    width: width(80),
    height: 80,
  },
});

export default styles;
