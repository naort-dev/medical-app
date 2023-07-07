import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  loacationView: {
    width: width(90),
    borderRadius: width(5),
    elevation: width(2),
    marginHorizontal: width(5),
    justifyContent: 'flex-start',
    marginBottom: height(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  locationImage: {
    alignSelf: 'center',
    width: width(90),
    height: height(25),
    borderTopLeftRadius: width(5),
    borderTopRightRadius: width(5),
  },
  discountText1: {
    color: AppColors.mainText,
    fontSize: width(4),
    lineHeight: height(3),
    fontWeight: 'bold',
    paddingLeft: width(1),
  },
  screenView: {
    paddingHorizontal: width(5),
    paddingVertical: height(1),
  },
  storeLocationText: {
    color: AppColors.secondaryText,
    fontSize: width(2.6),
    lineHeight: height(1.85),
  },
  innerOpenView: {
    backgroundColor: AppColors.accentColor,
    paddingHorizontal: width(6),
    paddingVertical: height(0.4),
    borderRadius: width(10),
  },
  openText: {
    color: AppColors.altText,
    fontSize: width(2.5),
    lineHeight: height(2.55),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  adressView: {
    flexDirection: 'row',
    backgroundColor: AppColors.containerBackground,
    padding: width(3),
    borderBottomLeftRadius: width(5),
    borderBottomRightRadius: width(5),
  },
  innerAdressView: {
    width: width(60),
  },
  starIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openView: {
    alignItems: 'flex-end',
    alignSelf: 'center',
    flex: 1,
  },
  innerInnerOpenView: {
    paddingTop: height(0.5),
  },
});

export default styles;
