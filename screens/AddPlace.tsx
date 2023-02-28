import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC } from "react";
import { PlaceForm } from "../components/Places/PlaceForm";
import { Place } from "../models/place";
import { RootStackParamList } from "../models/rootStackParamList";
import { insertPlace } from "../utils/database";

interface IAddPlace {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "AddPlace",
    undefined
  >;
}

export const AddPlace: FC<IAddPlace> = ({ navigation }) => {
  const createPlaceHandler = async (place: Place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};
