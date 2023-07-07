import React from 'react';
import {TextInput} from 'react-native';
import AppColors from '../../utills/AppColors';
import styles from './styles';

const InputField = ({value, onChange, autoComplete, style = {}, disabled = false}) => {
  const [focused, setFocused] = React.useState(false);
  const handleFocus = () => setFocused(true);

  const handleBlur = () => setFocused(false);
  return (
    <TextInput
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[
        styles.formInput,
        style,
        focused ? {borderColor: AppColors.accentColor, borderWidth: 2} : {},
      ]}
      onChangeText={onChange}
      autoComplete={autoComplete}
      defaultValue={value}
      editable={!disabled}
    />
  );
};

export default InputField;
