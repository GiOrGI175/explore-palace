import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CategoryList from '@/components/CategoryList';
import GoogleMapView from '@/components/GoogleMapView';
import Header from '@/components/Header';
import * as Location from 'expo-location';

import PalaceList from '@/components/PalaceList';
import GlobalApi from '@/services/GlobalApi';

export default function HomeScreen() {
  const [placeList, setPlaceList] = useState([]);
  const [mapRegion, setMapRegion] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>('tourism=hotel');
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
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
  };

  const GetNearBySearchPlace = async (category: string) => {
    if (!mapRegion) return;

    setLoading(true);
    try {
      const resp = await GlobalApi.nearByPlace(
        mapRegion.latitude,
        mapRegion.longitude,
        category,
        3000,
      );

      console.log('Category:', category);
      console.log('Found places:', resp.data.elements?.length || 0);

      setPlaceList(resp.data.elements || []);

      if (resp.data.elements?.length === 0) {
        setErrorMsg(`No ${category.split('=')[1]} found nearby`);
      } else {
        setErrorMsg(null);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
      setErrorMsg('Error loading places');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (category: string) => {
    console.log('Selected category:', category);
    setSelectedCategory(category);
    GetNearBySearchPlace(category);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (mapRegion) {
      GetNearBySearchPlace(selectedCategory);
    }
  }, [mapRegion]);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <GoogleMapView
        places={placeList}
        mapRegion={mapRegion}
        errorMsg={errorMsg}
      />
      <CategoryList
        onCategoryPress={handleCategoryPress}
        selectedCategory={selectedCategory}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#6200EE' />
          <Text>Loading places...</Text>
        </View>
      )}

      {!loading && placeList && placeList.length > 0 ? (
        <PalaceList placeList={placeList} />
      ) : (
        !loading && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {errorMsg || `Found 0 Palaces`}
            </Text>
          </View>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    padding: 20,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
