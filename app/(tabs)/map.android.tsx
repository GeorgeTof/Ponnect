import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  const initialRegion = {
    latitude: 46.7712,   // Cluj-Napoca
    longitude: 23.6236,  // Cluj-Napoca
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker
          coordinate={{ latitude: 46.7712, longitude: 23.6236 }}
          title="Cluj-Napoca"
          description="Cluj-Napoca, Romania"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  map: {
    flex: 1,
  },
});
