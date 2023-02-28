import { Location } from "./location";

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: Location | undefined;
  Map: Location | undefined;
  PlaceDetails: { placeId: string };
  Home: undefined;
};
