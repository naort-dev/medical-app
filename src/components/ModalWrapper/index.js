import React from 'react';
import {Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import AppColors from '../../utills/AppColors';
import styles from './styles';
const ModalWrapper = ({children, isVisible, onClose, containerStyle}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      backdropColor={'transparent'}
      onBackdropPress={onClose}
      avoidKeyboard={true}
      onBackButtonPress={onClose}>
      <View>
        <Pressable onPress={onClose}>
          <LinearGradient
            colors={[
              AppColors.transparent,
              AppColors.containerBackground,
              '#E5E2E2',
              '#CBCBCB',
            ]}
            style={styles.shadow}
          />
        </Pressable>
        <View
          style={[
            styles.modalInnerContainer,
            containerStyle ? containerStyle : {},
          ]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};
export default ModalWrapper;
