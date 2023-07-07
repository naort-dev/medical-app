import React, {useRef} from 'react';
import {height} from 'react-native-dimension';
import Button from '../../components/Button';
import ModalWrapper from '../ModalWrapper';
import ProductDetails from '../ProductDetails';
import {ScrollView} from 'react-native-gesture-handler';
import {updateCartItem} from '../../Redux/Actions/Cart';
//import { getAddedItems } from '../../Redux/Reducers/Cart';
import {connect} from 'react-redux';

const ModalProduct = ({
  isVisible,
  onClose,
  image,
  type,
  productName,
  THC,
  CBD,
  details,
  effects,
  setSelectedProduct,
  selectedProduct,
  cart,
  updateCartItem,
}) => {
  //const classes = useStyles();
  //const history = useHistory();
  //const products = fakeProducts;

  const handleAddToCart = (product) => {
    const item = cart.items.find(
      (it) => it.product.name === product.name,
    );
    const prevQuantity = item ? item.quantity : 0;
    throw new Error('Unable to add product without selecting an option.')
    updateCartItem({
      product,
      quantity: prevQuantity + 1,
    });
  };
  const scrollRef = useRef(null);
  return (
    <ModalWrapper
      isVisible={isVisible}
      onClose={onClose}
      containerStyle={{height: height(90), paddingTop: height(3)}}>
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
        <ProductDetails
          image={image}
          productName={productName}
          THC={THC}
          CBD={CBD}
          type={type}
          details={details}
          effects={effects}
          setSelectedProduct={setSelectedProduct}
          ref={scrollRef}
        />
      </ScrollView>
      <Button
        title={'Add to Cart'}
        onPress={() => handleAddToCart(selectedProduct)}
      />
    </ModalWrapper>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {updateCartItem})(ModalProduct);
