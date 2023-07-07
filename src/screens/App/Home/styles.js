import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
  },
  logoImg: {
    width: width(80),
    height: 120,
  },
  storeTitle: {
    fontSize: 18,
    color: AppColors.mainText,
  },
  backToStore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeInfoSection: {
    paddingRight: width(5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  headerView: {
    width: width(100),
    paddingHorizontal: width(5),
    backgroundColor: AppColors.background,
    paddingVertical: height(1),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText1: {
    color: AppColors.secondaryText,
    fontSize: width(4),
    lineHeight: height(3),
  },
  headerText2: {
    color: AppColors.mainText,
    fontSize: width(5.5),
    lineHeight: height(4),
    fontWeight: 'bold',
  },
  bannerView: {
    width: width(100),
    backgroundColor: AppColors.accentColor,
    paddingVertical: height(1),
    alignItems: 'center',
  },
  bannerText1: {
    color: AppColors.altText,
    fontSize: width(4),
    lineHeight: height(2.7),
    fontWeight: 'bold',
    paddingVertical: height(1),
  },
  bannerText2: {
    color: AppColors.altText,
    fontSize: width(3),
    lineHeight: height(2.7),
    textAlign: 'center',
    paddingBottom: height(1),
    paddingHorizontal: width(10),
  },
  discountView: {
    width: width(90),
    height: height(25),
    justifyContent: 'flex-end',
    borderRadius: width(4),
    padding: width(4),
  },
  shopifyView: {
    width: width(90),
    aspectRatio: Number(2000 / 563),
    justifyContent: 'center',
    borderRadius: width(4),
    padding: width(4),
  },
  discountImage: {
    width: width(90),
    height: height(25),
    position: 'absolute',
    borderRadius: width(4),
  },
  imageWrapper: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  shopifyImage: {
    width: width(90),
    height: height(25),
    position: 'absolute',
  },
  discountText1: {
    color: AppColors.altText,
    fontSize: width(4.5),
    lineHeight: height(3),
    fontWeight: 'bold',
  },
  discountText2: {
    color: AppColors.altText,
    fontSize: width(3.5),
    lineHeight: height(2.7),
  },
  categorySection: {
    borderColor: AppColors.mainText,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: width(5),
    paddingVertical: height(1),
    marginBottom: height(4),
  },
  screenView: {
    paddingLeft: width(5),
    paddingVertical: height(3),
  },
  locationText1: {
    color: AppColors.mainText,
    fontSize: width(4),
    lineHeight: height(2.7),
    fontWeight: 'bold',
  },
  storeLocationView: {
    flexDirection: 'row',
    backgroundColor: AppColors.detailBackground,
    borderRadius: width(5),
    marginTop: height(1),
  },
  storeLocationText: {
    color: AppColors.secondaryText,
    fontSize: width(2.5),
    lineHeight: height(1.85),
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: height(0.5),
  },
  iconView2: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    paddingRight: 20,
  },
  icon: {
    paddingRight: width(2),
  },
  locationTextView: {
    width: width(45),
    justifyContent: 'center',
    paddingLeft: width(4),
  },
  mapImageView: {
    width: width(45),
    height: height(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: width(35),
    height: width(35),
    borderRadius: width(3),
  },
});
export default styles;
