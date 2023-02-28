import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { Place } from "../../models/place";
import { RootStackParamList } from "../../models/rootStackParamList";
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

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

  const placeSelect = (id: string) => {
    navigation.navigate("PlaceDetails", {placeId: id})
  };

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={placeSelect} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
