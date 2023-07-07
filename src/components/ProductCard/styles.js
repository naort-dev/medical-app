import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  topWrapper: {
    borderWidth: 2,
    borderRadius: 2,
    marginRight: 10,
  },
  productContainer: {
    alignItems: 'flex-start',
    width: width(40),
    marginBottom: height(2.5),
    borderRadius: width(4),
    marginRight: width(2),
    padding: 10,
  },
  imageView: {
    height: height(10),
    width: width(40),
  },
  categoryView: {
    paddingHorizontal: width(3),
    borderRadius: width(1),
    position: 'absolute',
    right: 0,
    top: -12,
  },
  categoryText: {
    color: AppColors.altText,
    fontSize: width(2.5),
    lineHeight: height(2.55),
    fontWeight: 'bold',
  },
  productImage: {
    height: height(15),
    width: width(35),
    // marginBottom:height(1),
    // marginTop:height(1.1),
    // borderRadius:width(1),
    position: 'absolute',
  },
  detailsView: {
    width: width(40),
    height: height(12),
    justifyContent: 'center',
    borderBottomLeftRadius: width(4),
    borderBottomRightRadius: width(4),
    padding: height(1),
  },
  productCategoryText1: {
    width: width(38),
    color: AppColors.mainText,
    fontSize: width(3.5),
    lineHeight: height(1.9),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  productCategoryText2: {
    color: AppColors.effectTitle,
    fontSize: width(3),
    lineHeight: height(1.85),
    textAlign: 'left',
  },
  formInput: {
    width: width(30),
    backgroundColor: AppColors.navbar,
    borderRadius: 5,
    paddingRight: 0,
    paddingLeft: 0,
    color: 'white',
    borderWidth: 1,
    borderColor: 'gray',
  },
  dropdown: {
    borderWidth: 1,
    paddingLeft: 10,
    width: width(20),
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: width(40),
    borderRadius: width(4),
    marginRight: width(2),
    padding: 10,
  },
  addToCartContainer: {
    width: '100%',
    position: 'relative',
    right: 0,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  addToCart: {
    color: AppColors.mainText,
    textAlign: 'center',
  },
  ratingView: {
    display: 'flex',
    alignItems: 'flex-start',
  },
});

export default styles;
