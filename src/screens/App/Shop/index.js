import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import styles from './styles';
import Location from '../../../components/Location';
//import { isOpen } from '../../../components/IsOpen';
import {getStores} from '../../../backend/Catalog';

export default function Shop({navigation}) {
  useEffect(() => {
    loadStores();
  }, []);
  const loadStores = async (params = {}) => {
    const rep = await getStores();
    await setData(rep[0]);
  };
  const [data, setData] = useState({});
  const ShopLocation = async ({item}) => {
    //const open = {status:true,  closingTime: "11:00", openingTime: "8:00"}
    return (
      <Location
        locationName={item.name}
        address={null}
        image={item.image}
        open={null}
        onPress={() =>
          navigation.navigate('ShopDetail', {
            locationName: item.name,
            address:
              item.address.street +
              item.address.city +
              item.address.state +
              item.address.zipcode,
            locationImage: item.image,
            open: null,
            about: item.about,
          })
        }
      />
    );
  };
  return (
    <ScreenWrapper scrollEnabled>
      <View style={styles.mainViewContainer}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Our Locations</Text>
        </View>
        <ShopLocation item={data} />
      </View>
    </ScreenWrapper>
  );
}
