import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  imageView: {
    width: width(90),
    height: height(30),
    justifyContent: 'center',
    borderTopLeftRadius: width(4),
    borderTopRightRadius: width(4),
    backgroundColor: 'black',
  },
  backIcon: {
    paddingLeft: width(5),
    paddingBottom: height(10),
  },
  backgroundImage: {
    alignSelf: 'center',
    width: width(70),
    height: height(30),
  },
  mainViewContainer: {
    backgroundColor: 'black',
    maxWidth: width(95),
    paddingLeft: width(5),
    paddingTop: width(10),
    minHeight: height(100),
  },
  discountText1: {
    color: AppColors.mainText,
    fontSize: width(5.5),
    lineHeight: height(4),
    fontWeight: 'bold',
  },
  screenView: {
    paddingHorizontal: width(5),
    paddingVertical: height(1),
  },
  storeLocationText: {
    color: AppColors.secondaryText,
    fontSize: width(3.5),
    lineHeight: height(2.22),
    textAlign: 'justify',
  },
  innerDetailsView: {
    paddingTop: height(1),
  },
  innerDetailsViewText: {
    flexDirection: 'row',
    lineHeight: height(2.22),
  },
  detailsText: {
    color: AppColors.secondaryText,
    fontSize: width(3.5),
    lineHeight: height(2.2),
    fontWeight: 'bold',
  },
  productCategoryText1: {
    color: AppColors.mainText,
    fontSize: width(4.5),
    lineHeight: height(2.2),
    fontWeight: 'bold',
  },
  productCategoryText2: {
    color: AppColors.secondaryText,
    fontSize: width(3.5),
    lineHeight: height(2.2),
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
    justifyContent: 'space-between',
    paddingVertical: height(2),
    paddingRight: width(15),
  },
  innerAdressView: {
    width: width(50),
  },
  typeView: {
    paddingHorizontal: width(5),
    borderRadius: width(5),
    paddingVertical: height(0.5),
    backgroundColor: AppColors.red, //?
    alignSelf: 'flex-end',
  },
  typeText: {
    color: AppColors.altText,
    fontSize: width(2.5),
    lineHeight: height(2.55),
    fontWeight: 'bold',
  },
  headingText: {
    color: AppColors.mainText,
    fontSize: width(5),
    lineHeight: height(3.5),
    fontWeight: 'bold',
  },

  locationMapView: {
    width: width(90),
    borderRadius: width(5),
    elevation: width(1),
  },
  locationMap: {
    height: height(30),
    width: width(90),
    alignSelf: 'center',
    borderRadius: width(5),
  },
  detailsView: {
    paddingRight: width(5),
  },
  effectView: {
    alignSelf: 'center',
    marginTop: height(2),
    paddingRight: width(5),
  },
  effectView1: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  effectView2: {
    flexDirection: 'row',
    marginTop: height(1),
  },
  effectContainerRight: {
    marginRight: width(2),
  },
  effectFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 40,
  },
  moreLike: {
    marginTop: height(2),
  },
  moreLikeThis: {
    color: AppColors.mainText,
    fontSize: width(5.5),
    lineHeight: height(4),
    fontWeight: 'bold',
    paddingVertical: height(0.5),
  },
  ratingView: {
    display: 'flex',
    alignItems: 'flex-start',
  },
});

export default styles;
