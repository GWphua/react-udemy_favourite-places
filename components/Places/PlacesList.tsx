import { FC } from "react";
import {
  FlatList, StyleSheet,
  Text,
  View
} from "react-native";
import { Place } from "../models/place";
import { PlaceItem } from "./PlaceItem";

interface IPlacesList {
  places: Place[];
}

export const PlacesList: FC<IPlacesList> = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  const placeSelect = () => {};

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={placeSelect} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});
