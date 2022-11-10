export interface Config {
  wkid: number;
  initialMapCenter: [number, number];
  initialMapZoom: number;
  minScale: number;
  maxScale: number;
  basemap: string;
}
