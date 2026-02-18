import { Link } from 'expo-router';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PalaceItem from './PalaceItem';

export type PlaceT = {
  id: number;
  lat: number;
  lon: number;
  type: string;

  tags: {
    // Names
    name?: string;
    'name:ka'?: string;
    'name:en'?: string;

    // Categories
    amenity?: string;
    tourism?: string;
    shop?: string;
    cuisine?: string;

    // Address
    'addr:street'?: string;
    'addr:housenumber'?: string;
    'addr:city'?: string;
    'addr:postcode'?: string;

    // Contact
    phone?: string;
    website?: string;
    'website:menu'?: string;
    'contact:facebook'?: string;
    'contact:instagram'?: string;
    'contact:twitter'?: string;
    email?: string;

    // Facilities & Accessibility
    bar?: 'yes' | 'no';
    toilets?: 'yes' | 'no';
    highchair?: 'yes' | 'no';
    changing_table?: 'yes' | 'no';
    wheelchair?: 'yes' | 'no';
    wifi?: 'yes' | 'no' | 'free';
    outdoor_seating?: 'yes' | 'no';
    parking?: 'yes' | 'no';
    air_conditioning?: 'yes' | 'no';
    smoking?: 'yes' | 'no' | 'outside' | 'isolated';

    // Rating & Classification
    stars?: string;
    rating?: string;

    // Hours
    opening_hours?: string;

    // Images
    image?: string;
    'image:url'?: string;
    wikimedia_commons?: string;

    // Description
    description?: string;
    note?: string;

    // Payment
    'payment:cash'?: 'yes' | 'no';
    'payment:cards'?: 'yes' | 'no';
    'payment:credit_cards'?: 'yes' | 'no';

    // Service
    takeaway?: 'yes' | 'no';
    delivery?: 'yes' | 'no';
    drive_through?: 'yes' | 'no';

    // Other useful tags
    capacity?: string;
    internet_access?: 'yes' | 'no' | 'wlan';
    operator?: string;
    brand?: string;
    'brand:wikidata'?: string;

    // Allow any other string keys for tags we might not know about
    [key: string]: string | undefined;
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
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/palace/[id]',
              params: { id: String(item.id) },
            }}
            asChild
          >
            <TouchableOpacity>
              <PalaceItem palce={item} />
            </TouchableOpacity>
          </Link>
        )}
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
