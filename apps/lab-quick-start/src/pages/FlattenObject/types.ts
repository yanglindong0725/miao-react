export interface Place {
  id: number;
  title: string;
  childPlaces: Place[];
}

export interface FlatPlace {
  id: number;
  title: string;
  parentId: number | null;
  level: number;
}
