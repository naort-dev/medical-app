import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  effectMainView: {
    flexDirection: 'row',
    width: width(43),
    borderRadius: width(2),
    padding: width(1),
    backgroundColor: AppColors.detailBackground,
    borderWidth: width(0.1),
    borderColor: AppColors.detailBorder,
    marginBottom: width(1),
    marginRight: width(1),
  },
  image: {
    width: width(5),
    height: height(5),
    color: 'white',
  },
  emojiView: {
    justifyContent: 'center',
  },
  textView: {
    marginTop: height(1),
    alignItems: 'flex-start',
    paddingLeft: width(2),
  },
  effectText1: {
    fontSize: width(2),
    lineHeight: height(1),
    color: AppColors.effectTitle,
  },
  effectText2: {
    color: AppColors.effect,
    fontSize: width(4),
    lineHeight: height(2.5),
    fontWeight: 'bold',
  },
  effectFlex: {
    flex: 1 / 2,
    margin: 5,
    backgroundColor: AppColors.containerBackground,
  },
});

export default styles;
