import {StyleSheet} from 'react-native';
import {width, height, totalSize} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  headingText: {
    fontSize: width(5),
    fontWeight: 'bold',
    color: AppColors.appPrimary,
    marginBottom: height(3.5),
    marginTop: height(2),
    textAlign: 'center',
  },
  subHeadingText: {
    fontSize: width(3.7),
    color: AppColors.darkGray,
    marginVertical: height(2.2),
    textAlign: 'center',
  },
  buttonContainer: {
    width: width(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height(3.5),
  },
  picOption: {
    alignItems: 'center',
  },
  picOptionText: {
    fontSize: width(3.85),
    textAlign: 'center',
    marginTop: height(1),
  },
  optionIcon: {
    height: height(8.5),
    width: height(8.5),
    resizeMode: 'contain',
    marginTop: height(1),
    tintColor: AppColors.appPrimaryBlue,
  },
  iconContainer: {
    paddingVertical: height(2),
    marginRight: width(0.5),
  },
  btn: {
    width: width(80),
    marginVertical: height(3),
    marginBottom: height(5),
  },
  addbutton: {
    marginTop: height(2),
  },
  close: {
    marginLeft: 'auto',
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10,
    top: 0,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  closeIconWrapper: {
<<<<<<< HEAD
=======
    flexDirection: 'row',
    width: '100%',
>>>>>>> ad82189a96a65da332f80c86d9a8c2d39e384329
    // backgroundColor: AppColors.navbar,
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
    width: 60,
    borderBottomLeftRadius: 10
  },
  // optionContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: width(1.5),
  //   backgroundColor: AppColors.button,
  //   height: height(6),
  //   width: width(20),
  //   alignSelf: 'center',
  //   marginTop: height(2),
  //   marginRight: width(2),
  //   marginBottom: height(1),
  // },
  inactiveOptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(1.5),
    backgroundColor: AppColors.detailBackground,
    height: height(6),
    width: width(20),
    alignSelf: 'center',
    marginTop: height(2),
    marginRight: width(2),
    marginBottom: height(1),
  },
  text: {
    color: AppColors.buttonText,
    fontSize: width(4),
  },
  optionList: {
    // alignItems: "flex-start"
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
<<<<<<< HEAD
  addToCart: {
    color: AppColors.mainText,
    textAlign: 'center',
    fontSize: 18,
    flex: 1,
    paddingVertical: 20
  },
  addToCartContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: "#00000040",
    position: 'relative',
    right: 0,
    borderRadius: 8,
    marginBottom: 12, 
    marginHorizontal: 4
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 4,
    marginBottom: 12, 
    marginTop: 12
  },
  dropdown: {
    flex:1,
    borderColor: "#00000040",
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 10,
    // width: width(50),
  },

=======
  mainViewContainer: {
    flex: 1,
    marginTop: height(9),
  },
  title: {
    fontSize: width(5),
    lineHeight: height(2.7),
    color: AppColors.mainText,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  titleView: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
  },
>>>>>>> ad82189a96a65da332f80c86d9a8c2d39e384329
});
export default styles;
