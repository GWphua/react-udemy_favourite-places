import { FC } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { OutlinedButton } from "../UI/OutlinedButton";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";

export const LocationPicker: FC = () => {
  const [locationPermissionStatus, requestPermission] = useForegroundPermissions();

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

    console.log(location);
  };


  const pickOnMapHandler = () => {};

  return (
    <View>
      <View style={styles.mapPreview}></View>
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
