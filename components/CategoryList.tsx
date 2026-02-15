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
    value: 'gas_station',
    icon: require('./../assets/img/gas.png'),
  },
  {
    id: 2,
    name: 'Restaurants',
    value: 'restaurant',
    icon: require('./../assets/img/food.png'),
  },
  {
    id: 3,
    name: 'Cafe',
    value: 'cafe',
    icon: require('./../assets/img/cafe.png'),
  },
];

const CategoryList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Top Category</Text>
      <FlatList
        data={categorylist}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log(item.name)}>
            <CategoryItem category={item} />
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
    fontFamily: 'Raleway-Regular',
  },
});
