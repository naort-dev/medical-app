import React, {useEffect} from 'react';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import {useDispatch} from 'react-redux';
import {Rating} from 'react-native-ratings';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {Dropdown} from 'react-native-element-dropdown';
import AppColors from '../../utills/AppColors';
import {updateCartItem, updateCartItemQuantity} from '../../Redux/Actions/Cart';
import styles from './styles';
import {width} from 'react-native-dimension';
import {getProductColor} from '../../utills/Methods';
const ProductCard = ({
  item,
  isLoading = false,
  onPress,
  containerStyle = {},
  cart,
  quat,
  navigation,
  inCart = false,
  canEdit=true,
  selectedOption,
  error
}) => {
  const dispatch = useDispatch();
  const [option, setOption] = React.useState(selectedOption);
  const [quantity, setQuantity] = React.useState(1);
  const [image, setImage] = React.useState();
  const [type, setType] = React.useState();
  const [productName, setProductName] = React.useState();
  const [description, setDescription] = React.useState();
  const [potency, setPotency] = React.useState();

  const color = getProductColor(type);
  useEffect(() => {
    for (let index = 0; index < item?.options?.length; index++) {
      const element = item.options[index];
      item.options[index].fullName = `${element.name} $${element.price / 100}`;
    }
    let tempOption = {};
    if (option) {
      tempOption = option;
      tempOption.fullName = `${tempOption?.name} $${tempOption?.price / 100}`;
    } else if (item?.options && item?.options.length > 0) {
      tempOption = item.options[0];
    } else {
      tempOption.name = '';
      tempOption.price = 0;
      tempOption.fullName = '$0';
    }
    setOption(tempOption);
    if (item) {
      setImage(item.images ? item.images[0] : null);
      setType(
        item.strain?.strain_type !== ''
          ? item.strain?.strain_type.split(' ')[0]
          : '',
      );
      setProductName(item.name);
      setDescription(item.brand?.name);
      setPotency(item.potency);
    }
  }, [item]);
  useEffect(() => {
    if (quat) {
      setQuantity(quat);
    }
  }, [quat]);
  const handleAddToCart = () => {
    if (canEdit && item && option) {
      dispatch(
        updateCartItem(
          item,
          option,
          quantity,
        ),
      );
      navigation.navigate('CartScreen', {screen: 'Cart'});
    }
  };
  const handleUpdateCart = (selectedOption, selectedQuantity) => {
    if (canEdit) {
      dispatch(
        updateCartItemQuantity(
          item.id,
          selectedOption.id,
          selectedQuantity
        ),
      );
    }
  };
  const handleChangeOption = (oldOption, newOption) => {
    if (canEdit) {
      dispatch(updateCartItem(
        item, 
        newOption, 
        quantity
      ))
      dispatch(
        updateCartItemQuantity(item.id, oldOption.id, 0)
      )
    }
  }
  const handleRemoveFromCart = () => {
    if (canEdit) {
      return Alert.alert(
        'Remove item?',
        'Are you sure you want to remove this item from your bag?',
        [
          // The "Yes" button
          {
            text: 'Yes',
            onPress: () => {
              dispatch(updateCartItemQuantity(item.id, option.id, 0));
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: 'Cancel',
          },
        ],
      );
    }
  };

  return (
    <View
      style={{
        borderWidth: 2,
        borderRadius: 8,
        marginRight: 10,
        borderColor: color,
        display: 'flex',
      }}>
      <TouchableOpacity
        style={[styles.productContainer, containerStyle]}
        onPress={onPress}
        activeOpacity={0.8}>
        <View style={styles.imageView}>
          <View style={styles.ratingView}>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={11}
              ratingBackgroundColor={AppColors.starBg}
              ratingColor={getProductColor(type)}
              startingValue={2}
              readonly={true}
              tintColor={'black'}
            />
          </View>
          {type ? (
            <View
              style={[
                styles.categoryView,
                {
                  backgroundColor: color,
                },
              ]}>
              <Text style={styles.categoryText}>{type.toUpperCase()}</Text>
            </View>
          ) : null}
          {productName ? (
            <Text numberOfLines={2} style={styles.productCategoryText1}>{productName}</Text>
          ) : null}
          {description ? (
            <Text style={[styles.productCategoryText2, {color: color}]}>
              {description}
            </Text>
          ) : null}
          <Text
            style={[styles.productCategoryText2, {color: AppColors.mainText}]}>
            {potency?.thc ? `THC: ${potency.thc}% ` : ''}{' '}
            {potency?.cbd ? `CBD: ${potency.cbd}%` : ''}
          </Text>
        </View>
        <View style={styles.detailsView}>
          {image ? (
            <Image
              source={{uri: image}}
              resizeMode="cover"
              style={styles.productImage}
            />
          ) : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.optionContainer}>
          <View style={{marginRight: 5}}>
            <Dropdown
              style={[
                styles.dropdown,
                {borderColor: color, backgroundColor: 'black'},
              ]}
              activeColor={color}
              containerStyle={{backgroundColor: AppColors.background}}
              selectedTextStyle={{color: AppColors.mainText, fontSize: 8}}
              data={item?.options}
              maxHeight={300}
              labelField="fullName"
              valueField="id"
              value={option?.id}
              disable={!canEdit}
              onChange={(item) => {
                const oldItem = option;
                setOption(item);
                if (inCart) {
                  handleChangeOption(oldItem, item);
                }
              }}
            />
          </View>
          <View>
            <Dropdown
              style={[
                styles.dropdown,
                {
                  width: width(15),
                  borderColor: color,
                  backgroundColor: 'black',
                },
              ]}
              activeColor={color}
              containerStyle={{backgroundColor: AppColors.background}}
              selectedTextStyle={{color: AppColors.mainText}}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => ({
                value: item,
                label: item,
              }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={quantity}
              disable={!canEdit}
              onChange={(item) => {
                setQuantity(item.value);
                if (inCart) {
                  handleUpdateCart(option, item.value);
                }
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={[
          styles.addToCartContainer,
          {backgroundColor: color, borderColor: 'white'},
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={error !== undefined}
          onPress={inCart ? handleRemoveFromCart : handleAddToCart}>
          <Text style={styles.addToCart}>
            {error ? error : (inCart ? 'Remove' : 'Add To Bag')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {updateCartItem})(ProductCard);
