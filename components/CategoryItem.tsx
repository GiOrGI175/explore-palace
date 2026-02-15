import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
type Category = {
  id: number;
  name: string;
  value: string;
  icon: any;
};

type Props = {
  category: Category;
};

const CategoryItem = ({ category }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={category.icon} style={styles.Img} />
      <Text style={styles.text}>{category.name}</Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
    margin: 5,
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
  },
  Img: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 13,
    fontFamily: 'Raleway-regular',
  },
});
