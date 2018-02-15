export interface Marker {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  group: string;
  text: string;
}
