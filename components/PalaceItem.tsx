import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PlaceT } from './PalaceList';

type Props = {
  palce: PlaceT;
};

const PalaceItem = ({ palce }: Props) => {
  const name =
    palce.tags['name:ka'] ||
    palce.tags.name ||
    palce.tags['name:en'] ||
    'უცნობი ადგილი';

  const street = palce.tags['addr:street'] || 'Street not available';
  const phone = palce.tags.phone || 'Phone not available';
  const opening = palce.tags.opening_hours || 'Opening hours not available';

  const facilities = [
    palce.tags.bar === 'yes' ? 'Bar' : null,
    palce.tags.toilets === 'yes' ? 'Toilets' : null,
    palce.tags.highchair === 'yes' ? 'Highchair' : null,
    palce.tags.changing_table === 'yes' ? 'Changing Table' : null,
  ].filter(Boolean);

  return (
    <View style={styles.card}>
      <Image
        source={require('./../assets/img/placeholder.jpg')}
        style={styles.img}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.street}>{street}</Text>
        <Text style={styles.phone}>{phone}</Text>
        <Text style={styles.opening}>{opening}</Text>

        {facilities.length > 0 && (
          <Text style={styles.facilities}>
            Facilities: {facilities.join(', ')}
          </Text>
        )}
      </View>
    </View>
  );
};

export default PalaceItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },

  img: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  street: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },

  phone: {
    fontSize: 14,
    marginTop: 2,
  },

  opening: {
    fontSize: 14,
    marginTop: 2,
    fontStyle: 'italic',
  },

  facilities: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },
});
