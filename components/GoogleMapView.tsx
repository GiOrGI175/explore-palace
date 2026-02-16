import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import MapView, { Marker, UrlTile } from 'react-native-maps';
import { PlaceT } from './PalaceList';

type Props = {
  places?: PlaceT[];
  mapRegion: any;
  errorMsg?: string | null;
};

const GoogleMapView = ({ places, mapRegion, errorMsg }: Props) => {
  if (!mapRegion) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Top Near by Places</Text>

      <MapView
        style={styles.map}
        initialRegion={mapRegion}
        showsUserLocation={true}
        onRegionChangeComplete={(region) => {
          console.log('region', region);
        }}
      >
        <UrlTile
          urlTemplate='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          maximumZ={19}
        />

        <Marker
          title='You are here'
          coordinate={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
          }}
        />

        {places?.map((place) => (
          <Marker
            key={place.id}
            title={place.tags['name:ka'] || place.tags.name || 'Unknown Place'}
            description={place.tags.amenity || ''}
            coordinate={{ latitude: place.lat, longitude: place.lon }}
            pinColor='blue'
          />
        ))}
      </MapView>

      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
};

export default GoogleMapView;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
  },

  map: {
    width: Dimensions.get('screen').width * 0.89,
    height: Dimensions.get('screen').height * 0.3,
    borderRadius: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    marginTop: 10,
    color: 'red',
  },
});
