import React, {Children} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const minOption = (options) => {
  let min = options[0];
  options.forEach((option) => {
    if (parseFloat(option.price) < parseFloat(min.price)) {
      min = option;
    }
  });
  return min;
};
const Product = ({item, onPress, isLoading = false, containerStyle = {}}) => {
  const image = item.images ? item.images[0] : null;
  const type = item.strain?.strain_type;
  const productName = item.name;
  const THC = item.potency?.thc;
  const CBD = item.potency?.cbd;
  const price = item.options ? item.options[0].price : null;
  const option = item.options ? minOption(item.options) : null;
  return (
    <SkeletonContent
      isLoading={isLoading}
      layout={[
        {
          marginTop: height(2.5),
          flexDirection: 'row',
          children: [
            {
              width: width(16),
              height: height(8),
              marginRight: width(5),
              marginBottom: height(3),
            },
            {
              flexDirection: 'column',
              children: [
                {
                  width: width(65),
                  height: height(3),
                  marginBottom: height(2),
                },
                {
                  width: width(65),
                  height: height(3),
                  marginBottom: 10,
                },
              ],
            },
          ],
        },
      ]}>
      <TouchableOpacity
        style={[styles.productContainer, containerStyle]}
        activeOpacity={0.9}
        onPress={onPress}>
        <View style={styles.innerProductContainer1}>
          <View style={styles.imageView}>
            <Image
              source={{uri: image}}
              resizeMode="cover"
              style={styles.productImage}
            />
          </View>
          <View style={styles.detailsView}>
            <Text style={styles.productCategoryText1}>{productName}</Text>
            <View style={styles.innerDetailsView}>
              <View style={[styles.innerDetailsViewText]}>
                <Text style={styles.detailsText}>{THC ? 'THC:' : ''}</Text>
                <Text style={styles.productCategoryText2}>
                  {' '}
                  {THC ? Math.ceil(parseFloat(THC)) + '%' : ''}
                </Text>
              </View>
              <View style={[styles.innerDetailsViewText]}>
                <Text style={styles.detailsText}>{CBD ? 'CBD:' : ''}</Text>
                <Text style={styles.productCategoryText2}>
                  {' '}
                  {CBD ? Math.ceil(parseFloat(CBD)) + '%' : ''}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.innerProductContainer2}>
          <View
            style={[
              styles.typeView,
              {
                backgroundColor:
                  type === 'sativa'
                    ? AppColors.sativa
                    : type === 'hybrid'
                    ? AppColors.hybrid
                    : AppColors.indica,
              },
            ]}>
            <Text style={styles.typeText}>{type.toUpperCase()}</Text>
          </View>
          <View style={styles.priceView}>
            <Text
              style={[styles.productCategoryText2, {paddingTop: height(0.5)}]}>
              {option ? `$${option.price / 100} per ${option.name}` : ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </SkeletonContent>
  );
};

export default Product;
