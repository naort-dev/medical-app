import React, {Fragment} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  AppState,
} from 'react-native';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import AppColors from '../../utills/AppColors';
import {height} from 'react-native-dimension';
export const ScreenWrapper = ({
  children,
  statusBarColor = AppColors.background,
  transclucent = false,
  scrollEnabled = false,
  backgroundImage,
  containerViewStyle = {},
  contentContainerStyle = {},
  headerUnScrollable = () => null,
  footerUnScrollable = () => null,
  backgroundColor = AppColors.background,
  barStyle = 'dark-content',
}) => {
  if (backgroundImage) {
    backgroundColor = AppColors.transparent;
  }
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }
  const content = () => {
    return (
      <>
        {headerUnScrollable()}
        <View
          style={[
            styles.mainViewContainer,
            containerViewStyle,
            {
              backgroundColor: transclucent
                ? AppColors.transparent
                : backgroundColor,
            },
          ]}>
          {scrollEnabled ? (
            <KeyboardAwareScrollView
              contentContainerStyle={[
                styles.contentContainer,
                contentContainerStyle,
              ]}
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={height(8)}
              showsVerticalScrollIndicator={false}>
              {children}
            </KeyboardAwareScrollView>
          ) : (
            children
          )}
          {footerUnScrollable()}
        </View>
      </>
    );
  };
  return (
    <Fragment>
      <FocusAwareStatusBar
        barStyle={'light-content'}
        backgroundColor={AppColors.background}
        translucent={transclucent}
      />
      {!transclucent && (
        <SafeAreaView style={{backgroundColor: statusBarColor}} />
      )}
      {backgroundImage ? (
        <ImageBackground
          source={backgroundImage}
          style={styles.container}
          resizeMode={'cover'}>
          {content()}
        </ImageBackground>
      ) : (
        content()
      )}
    </Fragment>
  );
};
