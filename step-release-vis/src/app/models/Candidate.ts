import {Polygon} from './Polygon';

export class Candidate {
  candName: string;
  color: number;
  polygons: Polygon[];

  constructor(candName: string, color: number) {
    this.candName = candName;
    this.color = color;
  }

  // TODO(#169): addPolugon(polygon: Polygon)

  polygonHovered(): void {
    this.polygons.map(polygon => (polygon.highlight = true));
  }

  polygonUnhovered(): void {
    this.polygons.map(polygon => (polygon.highlight = true));
  }
}