import Module from '../models/module';
import { Vector3 } from 'three';
import { Datasource } from '../datasource';
import { Instrument } from '../instrument';

export function createShapes(addModule: (module: Module) => void) {
  const datasource = new Module(
    'datasource',
    new Vector3(-3, 5, 0),
    undefined,
    new Datasource()
  );

  const instrument = new Module(
    'instrument',
    new Vector3(3, 5, 0),
    new Instrument(),
    undefined
  );

  addModule(datasource);
  // addModule(trigger);
  addModule(instrument);

  const yesterday = new Date(Date.now());
  yesterday.setDate(yesterday.getDate() - 1);
  datasource.datasource?.getFullDay(yesterday);
}
