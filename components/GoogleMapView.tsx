import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';
import MapView, { Marker, UrlTile } from 'react-native-maps';

const GoogleMapView = () => {
  const [mapRegion, setMapRegion] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      // ✅ Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // ✅ Get user location
      const location = await Location.getCurrentPositionAsync({});

      // ✅ Set map region
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    };

    getCurrentLocation();
  }, []);

  // თუ არ ჩატვირთულა ლოკაცია
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

      <MapView style={styles.map} region={mapRegion} showsUserLocation={true}>
        {/* ✅ უფასო OpenStreetMap Tiles */}
        <UrlTile
          urlTemplate='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          maximumZ={19}
        />

        {/* ✅ Marker */}
        <Marker
          title='You are here'
          coordinate={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
          }}
        />
      </MapView>

      {/* Error */}
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
