import { Location } from "./location";
import { ReadableLocation } from "./readableLocation";

export class Place {
  title: string | undefined;
  imageUri: string | undefined;
  address: string | undefined;
  location: Location | undefined;
  id: string;

  constructor(
    title: string,
    imageUri: string | undefined,
    location: ReadableLocation | undefined
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location?.address;
    this.location = location && {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    this.id = new Date().toString() + Math.random().toString();
  }
}
