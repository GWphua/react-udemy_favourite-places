import {
  ImagePickerResult,
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { FC, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

interface IImagePicker {}

export const ImagePicker: FC<IImagePicker> = () => {
  const [image, setImage] = useState<ImagePickerResult>();
  const [cameraStatus, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraStatus === null) {
      return false;
    }

    console.log(cameraStatus.status);

    if (cameraStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    // const hasPermission = await verifyPermissions();

    // if (!hasPermission) {
    //   return;
    // }

    // const newImage = await launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [16, 9],
    //   quality: 0.5,
    // });

    // console.log(newImage);

    // setImage(newImage);

    console.log(cameraStatus?.status);
    if (cameraStatus && !cameraStatus.granted) {
      await requestPermission();
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 2],
      quality: 0.2,
    });
    console.log(result);
  };

  // };

  return (
    <View>
      <View>{image && <Text>"GotPic!"</Text>}</View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});
