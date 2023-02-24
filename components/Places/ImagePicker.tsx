import {
  ImagePickerResult,
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { FC, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export const ImagePicker: FC = () => {
  // const [image, setImage] = useState<ImagePickerResult>();
  const [cameraPermissionStatus, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (!cameraPermissionStatus) {
      Alert.alert("Camera Permission Status does not exist.");
      return false;
    }

    if (cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficint Permissions!",
        "You need to grant camera permissions to use this function."
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(image);
  };

  return (
    <View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});
