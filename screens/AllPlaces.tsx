import { PlacesList } from "../components/Places/PlacesList";
import { FC, useEffect, useState } from "react";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { RootStackParamList } from "../models/rootStackParamList";
import { Place } from "../models/place";

interface IAllPlaces {
  route: RouteProp<RootStackParamList, "AllPlaces">;
}

export const AllPlaces: FC<IAllPlaces> = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((currentPlaces) => [
        ...currentPlaces,
        route.params!.places,
      ]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
};
