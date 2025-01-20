export default class Connection {
  fromModuleId: number; // add Trigger here later
  toModuleId: number;
  constructor(fromModuleId: number, toModuleId: number) {
    this.fromModuleId = fromModuleId;
    this.toModuleId = toModuleId;
  }
}