import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const MySvgComponent = () => {
  return (
    <View style={styles.container}>
      <Svg  width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M12.883 0.213027C13.2453 -0.0710089 13.7547 -0.0710089 14.117 0.213027L26.617 10.013C26.8588 10.2026 27 10.4928 27 10.8V26.2C27 27.2053 26.6039 28.1709 25.8963 28.8842C25.1885 29.5977 24.2267 30 23.2222 30H3.77778C2.77327 30 1.81152 29.5977 1.10367 28.8842C0.396095 28.1709 0 27.2053 0 26.2V10.8C0 10.4928 0.141229 10.2026 0.383013 10.013L12.883 0.213027ZM2 11.2867V26.2C2 26.68 2.18922 27.1387 2.52351 27.4756C2.85753 27.8123 3.30887 28 3.77778 28H23.2222C23.6911 28 24.1425 27.8123 24.4765 27.4756C24.8108 27.1387 25 26.68 25 26.2V11.2867L13.5 2.27069L2 11.2867Z" fill="#939393"/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M8 15C8 14.4477 8.44772 14 9 14H18C18.5523 14 19 14.4477 19 15V29C19 29.5523 18.5523 30 18 30C17.4477 30 17 29.5523 17 29V16H10V29C10 29.5523 9.55228 30 9 30C8.44772 30 8 29.5523 8 29V15Z" fill="#939393"/>
        </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});