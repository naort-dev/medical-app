import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';

function ModalSmaller() {
  const [isModalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationType="fade">
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <Text style={styles.itemTitle}>
                  Check out{'\n'}the new drip.
                </Text>
              </View>
              <View style={{padding: 5}}>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.closeBtn}>&times;</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <Text style={styles.itemDescription}>
                  Chamberlain Coffee is brewed in every cup from Gopuff Kitchen
                  for a limited time.
                </Text>
              </View>
              <View style={{padding: 5}}>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.orderBtn}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Image style={styles.image} source={require('./img103.png')} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'rgb(151, 190, 229)',
    overflow: 'hidden',
  },
  itemTitle: {
    fontSize: 40,
    color: 'black',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  closeBtn: {
    color: '#505050',
    fontSize: 30,
    paddingHorizontal: 10,
  },
  orderBtn: {
    backgroundColor: 'black',
    borderRadius: 1000,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 8 / 5,
  },
});

export default ModalSmaller;
