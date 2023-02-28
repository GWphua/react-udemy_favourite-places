import { Location } from "./location";
import { ReadableLocation } from "./readableLocation";

export class Place {
  title: string;
  imageUri: string;
  address: string;
  location: Location;
  id: string;

  constructor(
    title: string,
    imageUri: string,
    location: ReadableLocation,
    id?: number
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = {
      latitude: location.latitude,
      longitude: location.longitude,
    };

    if (id === undefined) {
      this.id = new Date().toString() + Math.random().toString();
    } else {
      this.id = id.toString();
    }
  }
}
