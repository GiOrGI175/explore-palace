import { PlaceT } from '@/components/PalaceList';
import GlobalApi from '@/services/GlobalApi';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';

const { width } = Dimensions.get('window');

const PalaceDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [place, setPlace] = useState<PlaceT | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const fetchPlace = async () => {
    setLoading(true);
    try {
      const data = await GlobalApi.getPlaceById(Number(id));
      setPlace(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchPlace();
  }, [id]);

  const name =
    place?.tags['name:ka'] ||
    place?.tags.name ||
    place?.tags['name:en'] ||
    'უცნობი ადგილი';

  const getCategory = () => {
    if (!place) return 'building';
    if (place.tags.amenity === 'fuel') return 'gas-station';
    if (place.tags.amenity === 'restaurant') return 'restaurant-food';
    if (place.tags.amenity === 'cafe') return 'cafe-coffee';
    if (place.tags.tourism === 'hotel') return 'hotel-bedroom';
    if (place.tags.shop === 'supermarket') return 'supermarket';
    return 'building-architecture';
  };

  const imageUri = imageError
    ? `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop`
    : `https://source.unsplash.com/800x600/?${getCategory()}&sig=${id}`;

  const openInMaps = () => {
    if (!place) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`;
    Linking.openURL(url);
  };

  const callPhone = () => {
    if (place?.tags.phone) {
      Linking.openURL(`tel:${place.tags.phone}`);
    }
  };

  const openWebsite = () => {
    if (place?.tags.website) {
      Linking.openURL(place.tags.website);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6200EE' />
        <Text style={styles.loadingText}>იტვირთება...</Text>
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name='error-outline' size={64} color='#999' />
        <Text style={styles.errorText}>ადგილი ვერ მოიძებნა</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>უკან დაბრუნება</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={styles.headerImage}
          onError={() => setImageError(true)}
        />
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <AntDesign name='arrow-left' size={24} color='#fff' />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.categoryContainer}>
          {place.tags.amenity && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {place.tags.amenity.toUpperCase()}
              </Text>
            </View>
          )}
          {place.tags.tourism && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {place.tags.tourism.toUpperCase()}
              </Text>
            </View>
          )}
          {place.tags.stars && (
            <View style={styles.ratingContainer}>
              <AntDesign name='star' size={16} color='#FFD700' />
              <Text style={styles.ratingText}>
                {place.tags.stars} ვარსკვლავი
              </Text>
            </View>
          )}
        </View>

        <View style={styles.infoSection}>
          {place.tags['addr:street'] && (
            <TouchableOpacity style={styles.infoRow} onPress={openInMaps}>
              <Ionicons name='location-sharp' size={24} color='#6200EE' />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>მისამართი</Text>
                <Text style={styles.infoText}>
                  {place.tags['addr:street']}
                  {place.tags['addr:housenumber']
                    ? `, ${place.tags['addr:housenumber']}`
                    : ''}
                </Text>
              </View>
              <AntDesign name='right' size={16} color='#999' />
            </TouchableOpacity>
          )}

          {place.tags.phone && (
            <TouchableOpacity style={styles.infoRow} onPress={callPhone}>
              <Ionicons name='call' size={24} color='#6200EE' />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>ტელეფონი</Text>
                <Text style={styles.infoText}>{place.tags.phone}</Text>
              </View>
              <AntDesign name='right' size={16} color='#999' />
            </TouchableOpacity>
          )}

          {place.tags.opening_hours && (
            <View style={styles.infoRow}>
              <Ionicons name='time' size={24} color='#6200EE' />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>სამუშაო საათები</Text>
                <Text style={styles.infoText}>{place.tags.opening_hours}</Text>
              </View>
            </View>
          )}

          {place.tags.website && (
            <TouchableOpacity style={styles.infoRow} onPress={openWebsite}>
              <Ionicons name='globe' size={24} color='#6200EE' />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>ვებგვერდი</Text>
                <Text style={styles.infoText} numberOfLines={1}>
                  {place.tags.website}
                </Text>
              </View>
              <AntDesign name='right' size={16} color='#999' />
            </TouchableOpacity>
          )}

          {place.tags.email && (
            <View style={styles.infoRow}>
              <Ionicons name='mail' size={24} color='#6200EE' />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>ელ. ფოსტა</Text>
                <Text style={styles.infoText}>{place.tags.email}</Text>
              </View>
            </View>
          )}
        </View>

        {(place.tags.wifi ||
          place.tags.toilets ||
          place.tags.wheelchair ||
          place.tags.outdoor_seating ||
          place.tags.parking) && (
          <View style={styles.facilitiesSection}>
            <Text style={styles.sectionTitle}>დამატებითი ინფორმაცია</Text>
            <View style={styles.facilitiesGrid}>
              {place.tags.wifi === 'yes' && (
                <View style={styles.facilityItem}>
                  <Ionicons name='wifi' size={20} color='#6200EE' />
                  <Text style={styles.facilityText}>WiFi</Text>
                </View>
              )}
              {place.tags.toilets === 'yes' && (
                <View style={styles.facilityItem}>
                  <MaterialIcons name='wc' size={20} color='#6200EE' />
                  <Text style={styles.facilityText}>ტუალეტი</Text>
                </View>
              )}
              {place.tags.wheelchair === 'yes' && (
                <View style={styles.facilityItem}>
                  <MaterialIcons name='accessible' size={20} color='#6200EE' />
                  <Text style={styles.facilityText}>ხელმისაწვდომი</Text>
                </View>
              )}
              {place.tags.outdoor_seating === 'yes' && (
                <View style={styles.facilityItem}>
                  <MaterialIcons name='deck' size={20} color='#6200EE' />
                  <Text style={styles.facilityText}>ღია ცის ქვეშ</Text>
                </View>
              )}
              {place.tags.parking === 'yes' && (
                <View style={styles.facilityItem}>
                  <Ionicons name='car' size={20} color='#6200EE' />
                  <Text style={styles.facilityText}>პარკინგი</Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>ლოკაცია რუკაზე</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: place.lat,
              longitude: place.lon,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <UrlTile
              urlTemplate='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
              maximumZ={19}
            />
            <Marker
              coordinate={{ latitude: place.lat, longitude: place.lon }}
              title={name}
            />
          </MapView>
          <TouchableOpacity style={styles.directionButton} onPress={openInMaps}>
            <Ionicons name='navigate' size={20} color='#fff' />
            <Text style={styles.directionButtonText}>მიმართულება</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PalaceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    color: '#666',
  },
  backButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#6200EE',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: width,
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 25,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  categoryBadge: {
    backgroundColor: '#E8DEF8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6200EE',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  facilitiesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  facilityText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  mapSection: {
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 12,
  },
  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  directionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
