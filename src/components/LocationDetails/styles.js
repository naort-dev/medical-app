import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  ScreenWrapper: {
    paddingVertical: height(0),
  },
  mainViewContainer: {
    flex: 1,
    backgroundColor: 'black',
    // paddingHorizontal:width(5)
  },
  imageView: {
    width: width(100),
    height: height(30),
    justifyContent: 'center',
  },
  iconView: {
    position: 'absolute',
    top: 40,
    zIndex: 1,
  },
  backIcon: {
    paddingLeft: width(5),
    paddingBottom: height(10),
  },
  backgroundImage: {
    width: width(100),
    height: height(30),
  },
  discountText1: {
    color: AppColors.mainText,
    fontSize: width(5.5),
    lineHeight: height(3),
    fontWeight: 'bold',
  },
  screenView: {
    paddingHorizontal: width(3),
    paddingVertical: height(1),
  },
  storeLocationText: {
    color: AppColors.secondaryText,
    fontSize: width(3.5),
    lineHeight: height(2.3),
  },
  innerOpenView: {
    backgroundColor: AppColors.accentColor,
    paddingHorizontal: width(6),
    paddingVertical: height(0.4),
    borderRadius: width(10),
  },
  innerInnerOpenView: {
    paddingTop: height(1),
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
    backgroundColor: 'black',
    paddingVertical: height(1.2),
    paddingHorizontal: width(3),
    marginTop: height(1),
    justifyContent: 'space-between',
  },
  innerAdressView: {
    width: width(60),
  },
  openView: {
    alignItems: 'flex-end',
    alignSelf: 'center',
    flex: 1,
  },
  headingText: {
    color: AppColors.mainText,
    fontSize: width(5),
    lineHeight: height(3.5),
    fontWeight: 'bold',
  },

  locationMapView: {
    width: width(90),
    height: height(30),
    borderRadius: width(5),
    elevation: width(0.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    alignSelf: 'center',
    marginTop: height(1),
    alignItems: 'center',
    overflow: 'hidden',
  },
  locationMap: {
    height: height(30),
    width: width(90),
    alignSelf: 'center',
    borderRadius: width(5),
  },
  about: {
    paddingHorizontal: width(3),
    marginTop: height(2),
  },
});

export default styles;
