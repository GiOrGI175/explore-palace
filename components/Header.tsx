import React from 'react';
import { Dimensions, Image, StyleSheet, TextInput, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./../assets/img/logo.png')} style={styles.logo} />

      <View>
        <TextInput placeholder='Search' style={styles.searchBar} />
      </View>
      <Image
        source={require('./../assets/img/placeholder.jpg')}
        style={styles.userImg}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    borderRadius: 50,
    paddingLeft: 10,
    width: Dimensions.get('screen').width * 0.6,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
