import { Vector3, Mesh } from "three";
import { Datasource } from "../datasource";
import { Instrument } from "../instrument";

export default class Module {
  type: string;
  color: string;
  position: Vector3;
  worldPos: Vector3;
  instrument: Instrument | undefined;
  datasource: Datasource | undefined;
  meshRef: React.MutableRefObject<Mesh> | undefined; // reference to the Shape mesh (e.g. cube)
  constructor(
    type: string,
    position: Vector3,
    instrument: Instrument | undefined,
    datasource: Datasource | undefined
  ) {
    this.type = type;
    this.position = position;
    this.worldPos = position;
    this.instrument = instrument;
    this.datasource = datasource;
    this.meshRef = undefined;
    switch (type) {
      case 'datasource':
        this.color = 'royalblue';
        break;
      case 'trigger':
        this.color = 'hotpink';
        break;
      case 'instrument':
        this.color = 'orange';
        break;
      default:
        this.color = 'white';
    }
  }
  clone(position: Vector3) {
    if (this.type === 'datasource') {
      return new Module(this.type, position, undefined, this.datasource);
    } else if (this.type === 'instrument') {
      return new Module(this.type, position, new Instrument(), undefined);
    } else {
      return new Module(this.type, position, undefined, undefined);
    }
  }
}
