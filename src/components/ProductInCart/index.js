import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import QuantityButton from '../ButtonQuantity';
import {updateCartItemQuantity} from '../../Redux/Actions/Cart';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {recordAnalytics} from '../../backend/Analytics';
import {EVENT} from '../../utills/Constants';
import OneSignal from 'react-native-onesignal';

const ProductInCart = ({
  item,
  option,
  isLoading = false,
  quantity,
  containerStyle = {},
  updateCartItemQuantity,
  id,
}) => {
  const image = item.images ? item.images[0] : null;
  const productName = item.name;
  const price = item.options ? item.options[0].price / 100 : null;
  const name = item.options ? item.options[0].name : null;
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
        activeOpacity={0.9}>
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
            <Text style={styles.detailsText}>{name}</Text>
            <View style={styles.innerDetailsView}>
              <View style={styles.innerDetailsViewText}>
                <Text style={styles.productCategoryText2}> ${price} </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <QuantityButton
            title={
              <FontAwesome
                name="plus-circle"
                color={AppColors.secondaryText}
                size={width(3.7)}
              />
            }
            onPress={() => {
              updateCartItemQuantity(item.id, option.id, quantity + 1);
              recordAnalytics(EVENT.UPDATE_CART, {
                product_id: item.id,
                option_id: option.id,
                quantity: quantity + 1,
              });
              OneSignal.sendTags({
                cart_updated_at: new Date(),
                product_id: item.id,
                option_id: option.id,
                quantity: quantity + 1,
              });
            }}
          />
          <Text style={styles.quantityText}>{quantity}</Text>
          <QuantityButton
            title={
              <FontAwesome
                name={quantity === 1 ? 'trash' : 'minus-circle'}
                color={AppColors.secondaryText}
                size={width(3.7)}
              />
            }
            onPress={() => {
              updateCartItemQuantity(item.id, option.id, quantity - 1);
              recordAnalytics(EVENT.UPDATE_CART, {
                product_id: item.id,
                option_id: option.id,
                quantity: quantity - 1,
              });
              OneSignal.sendTags({
                cart_updated_at: new Date(),
                product_id: item.id,
                option_id: option.id,
                quantity: quantity - 1,
              });
            }}
          />
        </View>
      </TouchableOpacity>
    </SkeletonContent>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {updateCartItemQuantity})(
  ProductInCart,
);
