import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CategoryItem from './CategoryItem';

type categorylistT = {
  id: number;
  name: string;
  value: string;
  icon: string;
};

const categorylist: categorylistT[] = [
  {
    id: 1,
    name: 'Gas Station',
    value: 'amenity=fuel',
    icon: require('./../assets/img/gas.png'),
  },
  {
    id: 2,
    name: 'Restaurants',
    value: 'amenity=restaurant',
    icon: require('./../assets/img/food.png'),
  },
  {
    id: 3,
    name: 'Cafe',
    value: 'amenity=cafe',
    icon: require('./../assets/img/cafe.png'),
  },
  {
    id: 4,
    name: 'Hotel',
    value: 'tourism=hotel',
    icon: require('./../assets/img/hotel.png'),
  },
  {
    id: 5,
    name: 'Shop',
    value: 'shop=supermarket',
    icon: require('./../assets/img/shop.png'),
  },
];

type Props = {
  onCategoryPress: (value: string) => void;
  selectedCategory?: string;
};

const CategoryList = ({ onCategoryPress, selectedCategory }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Top Category</Text>
      <FlatList
        data={categorylist}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onCategoryPress(item.value)}>
            <CategoryItem
              category={item}
              isSelected={selectedCategory === item.value}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Raleway-Regular',
  },
});
