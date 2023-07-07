import {StyleSheet} from 'react-native';
import {height} from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
  },
  search: {
    marginTop: 0,
    marginBottom: height(2),
  },
  checkoutButton: {
    paddingBottom: height(1),
  },
  productWrapper: {
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  sectionTitle: {
    color: AppColors.mainText,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  infoContent: {
    color: AppColors.mainText,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 40,
    paddingLeft: 30,
  }
});
export default styles;
