import {
  RouteProp, useIsFocused, useNavigation,
  useRoute
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions
} from "expo-location";
import { FC, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { Location } from "../../models/location";
import { RootStackParamList } from "../../models/rootStackParamList";
import { getMapPreview } from "../../utils/location";
import { OutlinedButton } from "../UI/OutlinedButton";

interface ILocationPicker {
  onPickLocation: (location: Location | undefined) => void;
}

export const LocationPicker: FC<ILocationPicker> = ({ onPickLocation }) => {
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "AddPlace">>();
  const [locationPermissionStatus, requestPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState<Location>();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = new Location(
        route.params.pickedLatitude,
        route.params.pickedLongitude
      );

      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    onPickLocation(pickedLocation);
  }, [pickedLocation, onPickLocation]);

  const verifyPermissions = async () => {
    if (!locationPermissionStatus) {
      Alert.alert("Location Permission Status does not exist.");
      return false;
    }

    if (locationPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficint Permissions!",
        "You need to grant location permissions to use this function."
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();

    setPickedLocation(
      new Location(location.coords.latitude, location.coords.longitude)
    );

    console.log(location);
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.mapPreviewImage}
        source={{
          uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.buttonContainer}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    overflow: "hidden",
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
