import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import CategoryList from '@/components/CategoryList';
import GoogleMapView from '@/components/GoogleMapView';
import Header from '@/components/Header';

import GlobalApi from '@/services/GlobalApi';

export default function HomeScreen() {
  useEffect(() => {
    GetNearBySearchPlace();
  }, []);

  const GetNearBySearchPlace = async () => {
    try {
      const resp = await GlobalApi.nearByPlace(41.7151, 44.8271);

      console.log('Nearby Places:', resp.data.elements);
    } catch (error) {
      console.log('Error fetching places:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <GoogleMapView />
      <CategoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    padding: 20,
  },
});
