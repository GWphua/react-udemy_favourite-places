export class ReadableLocation {
  latitude: number;
  longitude: number;
  address: string;

  constructor(latitude: number, longitude: number, address: string) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.address = address;
  }
}
