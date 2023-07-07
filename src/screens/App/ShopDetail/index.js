import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import LocationMap from '../../../assets/images/map.png';
import LocationDetails from '../../../components/LocationDetails';

export default function ShopDetail({navigation, route}) {
  const {storeInfo} = useSelector((state) => state.Auth);

  useEffect(() => {
    setData(storeInfo);
  }, [storeInfo]);
  
  const [data, setData] = useState();
  return (
    <View style={{flex: 1}}>
      {data && (
        <LocationDetails
          locationName={data?.name}
          location={data?.address}
          phone={data?.phone}
          address={
            data?.address?.street +
            ', ' +
            data?.address?.city +
            ', ' +
            data?.address?.state +
            ' ' +
            data?.address?.zipcode
          }
          locationImage={data?.photos ? data?.photos[0] : null}
          open={data?.open}
          hours={data?.hours}
          mapImage={LocationMap}
          about={data?.description}
          onBackIconPress={() => navigation.goBack()}
          onPress={() => navigation.navigate('Product')}
        />
      )}
    </View>
  );
}
