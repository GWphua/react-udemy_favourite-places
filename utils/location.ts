const GOOGLE_API_KEY = "AIzaSyBFXyKaUiEnstIYKgyCApoleOxfiXweKOg";

export const getMapPreview = (lat: number, lng: number) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

  return imagePreviewUrl;
};
