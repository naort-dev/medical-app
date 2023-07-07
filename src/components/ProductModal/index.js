import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Text, TouchableOpacity, StatusBar, View} from 'react-native';
import {height, width} from 'react-native-dimension';
import Button from '../Button';
import {Dropdown} from 'react-native-element-dropdown';
import ModalWrapper from '../ModalWrapper';
import ProductDetails from '../ProductDetails';
import {ScrollView} from 'react-native-gesture-handler';
import {updateCartItem} from '../../Redux/Actions/Cart';
//import { getAddedItems } from '../../Redux/Reducers/Cart';
import {connect, useDispatch} from 'react-redux';
import {startCheckout} from '../../Redux/Actions/Checkout';
import styles from './styles';
import {recordAnalytics} from '../../backend/Analytics';
import {EVENT} from '../../utills/Constants';
import OneSignal from 'react-native-onesignal';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
<<<<<<< HEAD
import {getProductColor} from '../../utills/Methods';
import AppColors from '../../utills/AppColors';
import { SafeAreaView } from 'react-native-safe-area-context';
=======
import ProductInCart from '../ProductInCart';
import AppColors from '../../utills/AppColors';
>>>>>>> ad82189a96a65da332f80c86d9a8c2d39e384329

const ModalProduct = ({
  isVisible,
  onClose,
  selectedProduct,
  cart,
  navigation,
  updateCartItem,
}) => {
  const details = selectedProduct?.description;
  const CBD = selectedProduct?.potency?.cbd;
  const THC = selectedProduct?.potency?.thc;
  const type = selectedProduct?.strain?.strain_type;
  const image = selectedProduct?.images ? selectedProduct.images[0] : null;
  const productName = selectedProduct?.name;
<<<<<<< HEAD
  const color = getProductColor(type || '');

  let options = [...(selectedProduct?.options ?? [])]
  options.sort((a, b) => { return a.price < b.price ? -1 : 1})

  const [option, setOption] = useState(options.length ? options[0] : {});
  
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    if (selectedProduct && option) {
      updateCartItem(
        selectedProduct,
        option,
        quantity,
      );
      onClose();
      navigation.navigate('CartScreen', {screen: 'Cart'});
    }
=======
  const [option, setOption] = useState(
    selectedProduct?.options ? selectedProduct?.options[0] : {},
  );
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    const item = cart.items.find(
      (it) => it.product.name === product.name,
    );
    const prevQuantity = item ? item.quantity : 0;
    updateCartItem({
      product,
      option,
      quantity: prevQuantity + 1,
    });
    handleNext();
>>>>>>> ad82189a96a65da332f80c86d9a8c2d39e384329
  };
  useEffect(() => {
    setFlag(false);
    if (selectedProduct) {
      setOption(options.length ? options[0] : {});
      setQuantity(1)
    }
  }, [selectedProduct]);
<<<<<<< HEAD

  function fmtPrice(price) {
    if (price) {
      const dollars = price / 100
      if (price % 100 === 0) {
        return `$${dollars.toFixed(0)}`
      }
      return `$${dollars.toFixed(2)}`
    } else { 
      return ""
    }
  }

  const scrollRef = useRef(null);
  function FocusAwareStatusBar(props) {
    return <StatusBar {...props} />;
  }
  return (
    <ModalWrapper
      isVisible={isVisible}
      onClose={onClose}
      containerStyle={{
        height: height(100),
        borderWidth: 5,
        borderColor: color,
        backgroundColor: color,
        marginTop: height(10),
        paddingTop: height(6)
      }}>
      <FocusAwareStatusBar
        barStyle={'light-content'}
        backgroundColor={color}
        translucent={false}
      />
      <View style={{...styles.closeIconWrapper, backgroundColor: color}}>
=======
  const handleNext = () => {
    setFlag(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const handleClose = () => {
    setFlag(false);
    onClose();
  };
  const checkoutCart = async () => {
    dispatch(startCheckout());
  };
  const subTotal = () => {
    let subtotal = 0;
    cart.items.map((item) => {
      subtotal += item.product.options[0].price * item.quantity;
    });
    return subtotal / 100;
  };
  const scrollRef = useRef(null);
  // const options = [
  //   { name: '1g', price: 5000 },
  //   { name: '0.8g', price: 4000 },
  //   // { name: '0.7g', price: 3000 },
  //   // { name: '0.5g', price: 2000 },
  // ];
  const ProductOption = ({item}) => {
    const active = true;
    return (
      <TouchableOpacity
        onPress={() => setOption(item)}
        activeOpacity={0.7}
        style={[
          item.name === option.name
            ? styles.optionContainer
            : styles.inactiveOptionContainer,
        ]}>
        <Text style={[styles.text]}>{item.name}</Text>
        <Text style={[styles.text]}>${item.price / 100}</Text>
      </TouchableOpacity>
    );
  };
  const CategoryProduct = ({item}) => {
    return (
      <View>
        <ProductInCart
          item={item.product}
          quantity={item.quantity}
          isLoading={loading}
          id={item.product.id}
        />
      </View>
    );
  };
  return (
    <ModalWrapper
      isVisible={isVisible}
      onClose={handleClose}
      containerStyle={{
        height: height(100),
        backgroundColor: flag
          ? AppColors.background
          : AppColors.containerBackground,
      }}>
      <View style={styles.closeIconWrapper}>
        {flag ? (
          <View style={styles.titleView}>
            <Text style={styles.title}>Cart</Text>
          </View>
        ) : null}
>>>>>>> ad82189a96a65da332f80c86d9a8c2d39e384329
        <FontAwesomeIcons
          name="close"
          size={30}
          color={AppColors.mainText}
          style={styles.close}
          onPress={handleClose}
        />
      </View>
<<<<<<< HEAD
      {/* <View style={{backgroundColor: 'black'}}> */}
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef} style={{backgroundColor: 'black'}}>
        <ProductDetails
          image={image}
          productName={productName}
          THC={THC}
          CBD={CBD}
          type={type}
          details={details}
          option={option}
          ref={scrollRef}
        />
      </ScrollView>
      {/* </View> */}
      {/* {selectedProduct?.options > 1 && (
        <FlatList
          data={selectedProduct?.options || []}
          renderItem={ProductOption}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )} */}
      <View style={styles.optionContainer}>
        {/* <View style={{marginRight: 5}}> */}
          <Dropdown
            style={[
              styles.dropdown,
              {
                flex: 3
              },
            ]}
            activeColor={color}
            containerStyle={{backgroundColor: AppColors.background}}
            selectedTextStyle={{color: AppColors.mainText}}
            data={options.map(o => {return { option: o, id: o.id, name: `${o.name} - ${fmtPrice(o.price)}`}})}
            maxHeight={300}
            labelField="name"
            valueField="id"
            value={option.id}
            dropdownPosition="top"
            onChange={(item) => {
              setOption(item.option);
            }}
          />
          <View style={{width: 12}}/>
          <Dropdown
            style={styles.dropdown}
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
            dropdownPosition="top"
            value={quantity}
            onChange={(item) => {
              setQuantity(item.value);
            }}
          />
        {/* </View> */}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          recordAnalytics(EVENT.ADD_TO_CART, {
            product_id: selectedProduct.id,
            option_id: option.id,
          });
          OneSignal.sendTags({
            cart_updated_at: new Date(),
            product_id: selectedProduct.id,
            option_id: option.id,
          });
          handleAddToCart();
=======
      {flag ? (
        <View style={styles.mainViewContainer}>
          <FlatList
            data={cart.items}
            renderItem={CategoryProduct}
            keyExtractor={(item) => item.productName}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
            <ProductDetails
              image={image}
              productName={productName}
              THC={THC}
              CBD={CBD}
              type={type}
              details={details}
              option={option}
              effects={effects}
              setSelectedProduct={setSelectedProduct}
              ref={scrollRef}
            />
          </ScrollView>
          {selectedProduct?.options > 1 && (
            <FlatList
              data={selectedProduct?.options || []}
              renderItem={ProductOption}
              keyExtractor={(item) => item.name}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </>
      )}
      <Button
        title={!flag ? 'Add to Cart' : `Checkout ($${subTotal()})`}
        onPress={() => {
          if (!flag) {
            recordAnalytics(EVENT.ADD_TO_CART, {
              product_id: selectedProduct.id,
              option_id: option.id,
            });
            OneSignal.sendTags({
              cart_updated_at: new Date(),
              product_id: selectedProduct.id,
              option_id: option.id,
            });
            handleAddToCart({...selectedProduct, options: [option]});
          } else {
            checkoutCart();
          }
>>>>>>> ad82189a96a65da332f80c86d9a8c2d39e384329
        }}
        style={styles.addToCartContainer}>
        <Text style={styles.addToCart}>Add To Bag{option && ` - ${fmtPrice(option.price * quantity)}`}</Text>
      </TouchableOpacity>
      <SafeAreaView/>
      {/* <Text style={styles.addToCart}>Add To Bag</Text>
      <Button
        title={'Add to Cart'}
        onPress={() => {

        }}
      /> */}
    </ModalWrapper>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {updateCartItem})(ModalProduct);
