import React from 'react';
import {useSelector} from 'react-redux';
import {Text, View, Image} from 'react-native';
import {getImgAssetUrl} from '../../backend/Config';
import styles from './styles';
const Effect = ({name, containerStyle = {}}) => {
  const {company} = useSelector((state) => state.Auth);
  return (
    <View style={[styles.effectMainView, containerStyle]}>
      <Image
        source={{
          uri: `${getImgAssetUrl(
            company.handle,
          )}/img/effects/${name.toLowerCase()}.png`,
        }}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.textView}>
        <Text style={styles.effectText1}>EFFECTS</Text>
        <Text style={styles.effectText2}>{name}</Text>
      </View>
    </View>
  );
};

export default Effect;
