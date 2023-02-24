import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Place } from "../models/place";

interface IPlaceItem {
  place: Place;
  onSelect: () => void;
}

export const PlaceItem: FC<IPlaceItem> = ({ place, onSelect }) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{uri: place.imageUri}}/>
      <View>
        <Text> {place.title} </Text>
        <Text>{place.address} </Text>
      </View>
    </Pressable>
  );
};


const styles = StyleSheet.create({

});