import React, {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import styles from './styles';
import ProductCard from '../../../components/ProductCard';
import Header from '../../../components/Header';
import AppColors from '../../../utills/AppColors';
import Button from '../../../components/Button';
import {connect, useDispatch, useSelector} from 'react-redux';
import { startCheckout } from '../../../Redux/Actions/Checkout';
function Category({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const cart = useSelector(s => s.cart)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const Product = ({item}) => {
    return (
      <View style={styles.productWrapper}>
        <ProductCard
          item={item.product}
          isLoading={loading}
          navigation={navigation}
          quat={item.quantity}
          selectedOption={item.option}
          inCart
        />
      </View>
    );
  };
  const checkoutCart = async () => {
    dispatch(startCheckout())
  };
  const subTotal = () => {
    let subtotal = 0;
    cart.items.map((item) => {
      if (
        item.product &&
        Array.isArray(item.product.options) &&
        item.product.options.length
      ) {
        subtotal += item.product.options[0].price * item.quantity;
      }
    });
    return subtotal / 100;
  };
  const totalQuantity = () => {
    let totalquantity = 0;
    console.log(cart.items)
    cart.items.map((item) => {
      totalquantity += item.quantity;
    });
    return totalquantity;
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => {
        return (
          <View style={{backgroundColor: AppColors.background}}>
            <Header title={'Cart'} onPress={() => navigation.goBack()} />
          </View>
        );
      }}>
      <View style={styles.mainViewContainer}>
        <Text style={styles.sectionTitle}>Your Bag</Text>
        <FlatList
          data={cart.items}
          renderItem={Product}
          keyExtractor={(item) => item.product_id + item.option_id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.checkoutButton}>
        <Text style={styles.sectionTitle}>ORDER SUMMARY</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoContent}>Items</Text>
          <Text style={styles.infoContent}>{totalQuantity()}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoContent}>Total</Text>
          <Text style={styles.infoContent}>${subTotal()}</Text>
        </View>
        <Button title={'Checkout'} onPress={checkoutCart} />
      </View>
    </ScreenWrapper>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

// export default connect(mapStateToProps, null)(Category);
export default Category
