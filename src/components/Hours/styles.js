import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  hoursView: {
    padding: width(3),
    marginVertical: height(3),
    borderRadius: width(4),
    elevation: width(0.2),
    marginHorizontal: width(3),
    backgroundColor: AppColors.navbar,
  },
  openingTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: '#aeaeae',
    paddingVertical: height(1),
  },
  headingText: {
    color: AppColors.mainText,
    fontSize: width(5),
    lineHeight: height(3.5),
    fontWeight: 'bold',
  },
  innerText: {
    color: AppColors.secondaryText,
    fontSize: width(3.5),
    lineHeight: height(3),
  },
});

export default styles;
