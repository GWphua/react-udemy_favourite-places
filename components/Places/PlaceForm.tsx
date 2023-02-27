import { FC, useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { Location } from "../../models/location";
import { Place } from "../../models/place";
import { ReadableLocation } from "../../models/readableLocation";
import { Button } from "../UI/Button";
import { ImagePicker } from "./ImagePicker";
import { LocationPicker } from "./LocationPicker";

interface IPlaceForm {
  onCreatePlace: (place: Place) => void;
}

export const PlaceForm: FC<IPlaceForm> = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>();
  const [pickedLocation, setPickedLocation] = useState<ReadableLocation>();

  const changeTitleHandler = (enteredTitle: string) => {
    setEnteredTitle(enteredTitle);
  };

  const takeImageHandler = (imageUri: string | undefined) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback(
    (readableLocation: ReadableLocation | undefined) => {
      setPickedLocation(readableLocation);
    },
    []
  );

  const savePlaceHandler = () => {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
