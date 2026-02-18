import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const GoogleMapViewFull = () => {
  const [mapRegion, setMapRegion] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      console.log('Location:', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Error getting location:', error);
      setErrorMsg('Failed to get location');
    } finally {
      setLoading(false);
    }
  };

  const centerToUserLocation = () => {
    getCurrentLocation();
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  if (loading || !mapRegion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6200EE' />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name='warning-outline' size={64} color='#ff5252' />
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={getCurrentLocation}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
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
          description='Your current location'
          coordinate={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
          }}
          pinColor='red'
        />
      </MapView>

      <TouchableOpacity
        style={styles.centerButton}
        onPress={centerToUserLocation}
      >
        <Ionicons name='locate' size={24} color='#fff' />
      </TouchableOpacity>

      <View style={styles.titleOverlay}>
        <Text style={styles.titleText}>Explore Places</Text>
      </View>
    </View>
  );
};

export default GoogleMapViewFull;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  map: {
    width: width,
    height: height,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },

  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },

  retryButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#6200EE',
    borderRadius: 8,
  },

  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  centerButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#6200EE',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  titleOverlay: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
});
