import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { OutlinedButton } from "../components/UI/OutlinedButton";
import { Colors } from "../constants/Colors";
import { Place } from "../models/place";
import { RootStackParamList } from "../models/rootStackParamList";
import { fetchPlaceDetails } from "../utils/database";

interface IPlaceDetails {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "PlaceDetails",
    string
  >;
  route: RouteProp<RootStackParamList, "PlaceDetails">;
}

export const PlaceDetails: FC<IPlaceDetails> = ({ navigation, route }) => {
  const [fetchedPlace, setFetchedPlace] = useState<Place>();

  const showOnMapHandler = () => {};

  if (!route.params) {
    return null;
  }

  const selectedPlaceId = route.params!.placeId;

  useEffect(() => {
    // Use selectedPlaceId to fetch data for a single place.
    const loadSelectedPlace = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    };

    loadSelectedPlace();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Page Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
