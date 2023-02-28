import { PlacesList } from "../components/Places/PlacesList";
import { FC, useEffect, useState } from "react";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { RootStackParamList } from "../models/rootStackParamList";
import { Place } from "../models/place";
import { fetchPlaces } from "../utils/database";

interface IAllPlaces {
  route: RouteProp<RootStackParamList, "AllPlaces">;
}

export const AllPlaces: FC<IAllPlaces> = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    };

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};
