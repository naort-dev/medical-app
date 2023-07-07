import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import AppColors from '../../utills/AppColors';
import styles from './styles';

const Search = ({onChangeText, value, onCancelPress}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.mainViewContainer}>
      <View style={styles.mainView}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={AppColors.secondaryText}
          style={styles.Search}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => value == '' && setIsFocus(false)}
        />
      </View>
      {value.length > 0 || isFocus ? (
        <TouchableOpacity
          style={styles.cancelView}
          onPress={() => {
            setIsFocus(false);
            Keyboard.dismiss();
            onCancelPress();
          }}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Search;
