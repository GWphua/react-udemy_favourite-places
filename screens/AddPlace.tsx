import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC } from "react";
import { PlaceForm } from "../components/Places/PlaceForm";
import { Place } from "../models/place";
import { RootStackParamList } from "../models/rootStackParamList";

interface IAddPlace {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "AddPlace",
    undefined
  >;
}

export const AddPlace: FC<IAddPlace> = ({ navigation }) => {
  const createPlaceHandler = (place: Place) => {
    navigation.navigate("AllPlaces", { places: place });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};
