import {
  useIsFocused,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { FC, useState, useEffect } from "react";
import { Alert, Image, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import { RootStackParamList } from "../../models/rootStackParamList";
import { getMapPreview } from "../../utils/location";
import { OutlinedButton } from "../UI/OutlinedButton";

export const LocationPicker: FC = () => {
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "AddPlace">>();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLatitude,
        lng: route.params.pickedLongitude,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  const [locationPermissionStatus, requestPermission] =
    useForegroundPermissions();

  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
  }>();

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

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

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
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
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
