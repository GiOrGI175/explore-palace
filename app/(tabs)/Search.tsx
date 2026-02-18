import GoogleMapViewFull from '@/components/GoogleMapViewFull';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Search = () => {
  return (
    <View style={styles.container}>
      <GoogleMapViewFull />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 50,
    // padding: 20,
  },
});
