import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  search: {
    marginTop: 0,
    marginBottom: height(2),
  },
  checkoutButton: {
    paddingBottom: height(1),
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileValue: {
    fontSize: 12,
    color: '#8f8f8f',
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.background,
  },
  profileLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  profileField: {
    marginLeft: 20,
  },
  title: {
    fontSize: 25,
    color: 'white',
    marginBottom: 20,
  },
  dateTitle: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
});
export default styles;
