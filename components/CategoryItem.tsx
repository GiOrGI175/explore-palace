import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  category: {
    name: string;
    icon: any;
  };
  isSelected?: boolean;
};

const CategoryItem = ({ category, isSelected }: Props) => {
  return (
    <View style={[styles.container, isSelected && styles.selectedContainer]}>
      <Image source={category.icon} style={styles.icon} />
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {category.name}
      </Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 100,
  },
  selectedContainer: {
    backgroundColor: '#6200EE',
  },
  icon: {
    width: 40,
    height: 40,
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
