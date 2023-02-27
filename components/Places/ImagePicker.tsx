import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions
} from "expo-image-picker";
import { FC, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { OutlinedButton } from "../UI/OutlinedButton";

interface IImagePicker {
  onTakeImage: (imageUri: string | undefined) => void;
}

export const ImagePicker: FC<IImagePicker> = ({ onTakeImage }) => {
  const [pickedImage, setPickedImage] = useState<string>();

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

    setPickedImage(image.uri);
    onTakeImage(image.uri);
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={takeImageHandler} icon="camera">
        Take Image
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
