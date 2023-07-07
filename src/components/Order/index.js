import React, {Children} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {height, width} from 'react-native-dimension';
import Button from '../../components/Button';
import OrderImg from '../../assets/images/flower.png';
import styles from './styles';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const OrderItem = ({item, onPress, isLoading = false, containerStyle = {}}) => {
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
              source={item.img || OrderImg}
              resizeMode="cover"
              style={styles.productImage}
            />
          </View>
          <View style={styles.detailsView}>
            <Text style={styles.productCategoryText1}>{item.productName}</Text>
            <View style={styles.innerDetailsView}>
              <View style={[styles.innerDetailsViewText]}>
                <Text style={styles.detailsText}>$14 Per Gram</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.innerProductContainer2}>
          <Button title={'Add to Cart'} onPress={() => {}} small />
        </View>
      </TouchableOpacity>
    </SkeletonContent>
  );
};

export default OrderItem;
