import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: AppColors.containerBackground,
    width: width(90),
    marginBottom: height(2.5),
    borderRadius: width(4),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    justifyContent: 'space-between',
    padding: width(4),
  },
  innerProductContainer1: {
    flexDirection: 'row',
    flex: 1,
  },
  innerProductContainer2: {
    flex: 1,
  },
  imageView: {
    height: height(8),
    width: width(18),
    borderRadius: width(2),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    backgroundColor: AppColors.containerBackground,
  },
  typeView: {
    paddingHorizontal: width(3),
    borderRadius: width(5),
    backgroundColor: AppColors.red, //?
    alignSelf: 'flex-end',
  },
  typeText: {
    color: AppColors.altText,
    fontSize: width(2.5),
    lineHeight: height(2.55),
    fontWeight: 'bold',
  },
  productImage: {
    height: width(20),
    width: width(20),
    borderRadius: width(2),
    position: 'absolute',
  },
  detailsView: {
    justifyContent: 'space-between',
    borderBottomLeftRadius: width(4),
    borderBottomRightRadius: width(4),
    width: width(40),
    paddingLeft: width(5),
  },
  innerDetailsView: {},
  innerDetailsViewText: {
    flexDirection: 'row',
    paddingTop: height(0.3),
  },
  detailsText: {
    color: AppColors.secondaryText,
    fontSize: width(3.5),
    lineHeight: height(2),
    fontWeight: 'bold',
  },
  productCategoryText1: {
    color: AppColors.mainText,
    fontSize: width(4.5),
    lineHeight: height(2.55),
    fontWeight: 'bold',
  },
  productCategoryText2: {
    color: AppColors.secondaryText,
    fontSize: width(3.5),
    lineHeight: height(2),
  },
  quantityText: {
    color: AppColors.secondaryText,
    marginTop: width(3),
    marginBottom: width(3),
  },
  priceView: {
    paddingTop: height(2.5),
    alignItems: 'flex-end',
  },
});

export default styles;
