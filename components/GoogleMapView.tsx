import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import * as Location from 'expo-location';

const GoogleMapView = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [mapRegion, setMapRegion] = useState<any>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }

    getCurrentLocation();
  }, []);

  if (!mapRegion) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Top Near by Places</Text>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}
      >
        <Marker title='You' coordinate={mapRegion} />
      </MapView>
    </View>
  );
};

export default GoogleMapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
  },
  map: {
    width: Dimensions.get('screen').width * 0.89,
    height: Dimensions.get('screen').height * 0.23,
    borderRadius: 20,
  },
});
