import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PalaceItem from './PalaceItem';

export type PlaceT = {
  id: number;
  lat: number;
  lon: number;
  type: string;

  tags: {
    name?: string;
    'name:ka'?: string;
    'name:en'?: string;

    amenity?: string;
    tourism?: string;
    shop?: string;
    cuisine?: string;

    'addr:street'?: string;
    'addr:housenumber'?: string;
    'addr:city'?: string;
    'addr:postcode'?: string;

    phone?: string;
    website?: string;
    'website:menu'?: string;
    'contact:facebook'?: string;
    'contact:instagram'?: string;
    'contact:twitter'?: string;
    email?: string;

    bar?: 'yes' | 'no';
    toilets?: 'yes' | 'no';
    highchair?: 'yes' | 'no';
    changing_table?: 'yes' | 'no';
    wheelchair?: 'yes' | 'no';

    opening_hours?: string;

    description?: string;
    note?: string;
  };
};

type PalaceListProps = {
  placeList: PlaceT[];
};

const PalaceList = ({ placeList }: PalaceListProps) => {
  return (
    <View>
      <Text style={styles.text}>Found {placeList.length} Palaces</Text>
      <FlatList
        data={placeList}
        renderItem={({ item }) => <PalaceItem palce={item} />}
      />
    </View>
  );
};

export default PalaceList;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
    marginTop: 10,
  },
});
