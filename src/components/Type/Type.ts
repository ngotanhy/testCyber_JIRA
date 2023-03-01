type PointGeometry = {
    type: "Point";
    coordinates: [number, number];
  };
  
  // Point Property là props nhận trong mrkerComponent
  export type PointProperty = {
    id: number;
    [key: string]: any;
  };
  
  export type Point = {
    type: "Feature";
    id: string;
    geometry: PointGeometry;
    properties: PointProperty;
  };
  
  export const data: Point[] = [];