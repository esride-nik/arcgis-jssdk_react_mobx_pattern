export interface Config {
  webMapItemId: string;
  wkid: number;
  initialMapCenter: [number, number];
  initialMapZoom: number;
  minScale: number;
  maxScale: number;
  basemap: string;
}
