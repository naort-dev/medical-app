import React, {forwardRef} from 'react';
// import {Rating} from 'react-native-ratings';
import {View, Text, Image} from 'react-native';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import {getProductColor} from '../../utills/Methods';

const ProductDetails = (
  {image, type, productName, THC, option, CBD, details},
  ref,
) => {
  return (
    <View style={styles.mainViewContainer}>
      {/* <View style={styles.ratingView}>
        <Rating
          type="custom"
          ratingCount={5}
          imageSize={20}
          ratingBackgroundColor={AppColors.starBg}
          ratingColor={getProductColor(type)}
          startingValue={2}
          readonly={true}
          tintColor={'black'}
        />
      </View> */}
      <View style={styles.adressView}>
        <View style={styles.innerAdressView}>
          <View>
            <Text style={styles.discountText1}>{productName}</Text>
          </View>
          <View style={styles.innerDetailsView}>
            {THC ? (
              <View style={styles.innerDetailsViewText}>
                <Text style={styles.detailsText}>THC:</Text>
                <Text style={styles.productCategoryText2}> {THC}%</Text>
              </View>
            ) : null}
            {CBD ? (
              <View style={styles.innerDetailsViewText}>
                <Text style={styles.detailsText}>CBD:</Text>
                <Text style={styles.productCategoryText2}> {CBD}%</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View>
          <View
            style={[
              styles.typeView,
              {
                backgroundColor:
                  type === 'SATIVA'
                    ? AppColors.sativa
                    : type === 'HYBRID'
                    ? AppColors.hybrid
                    : AppColors.indica,
              },
            ]}>
            <Text style={styles.typeText}>{type.toUpperCase().includes('INDICA') ? 'INDICA' : type.toUpperCase()}</Text>
          </View>
          <Text />
          <Text style={styles.productCategoryText2}>
            ${option?.price / 100} per {option?.name}
          </Text>
        </View>
      </View>
      <View style={styles.imageView}>
        <Image
          source={{uri: image}}
          resizeMode="cover"
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.headingText}>Description</Text>
        <Text style={styles.storeLocationText}>{details}</Text>
      </View>
    </View>
  );
};

export default forwardRef(ProductDetails);
