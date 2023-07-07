import React, {useRef} from 'react';
import {height, width} from 'react-native-dimension';
import {ScrollView} from 'react-native-gesture-handler';
//import { getAddedItems } from '../../Redux/Reducers/Cart';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';
import {updateCartItem} from '../../Redux/Actions/Cart';
import ModalWrapper from '../ModalWrapper';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const WebViewModal = ({isVisible, onClose, url}) => {
  const scrollRef = useRef(null);
  console.log(url);
  return (
    <ModalWrapper
      isVisible={isVisible}
      onClose={onClose}
      containerStyle={{height: height(90), paddingTop: height(3)}}>
      <FontAwesomeIcons
        name="close"
        size={30}
        color={'white'}
        style={styles.close}
        onPress={onClose}
      />
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
        <WebView
          source={{uri: url}}
          style={{minHeight: height(100), width: width(100)}}
        />
      </ScrollView>
    </ModalWrapper>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {updateCartItem})(WebViewModal);
