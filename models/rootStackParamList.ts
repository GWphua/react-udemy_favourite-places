import { Place } from "./place";

export type RootStackParamList = {
  AllPlaces: { places: Place } | undefined;
  AddPlace: { pickedLatitude: number; pickedLongitude: number } | undefined;
  Map: undefined;
};
