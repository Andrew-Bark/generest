import Module from "./module";
import Connection from "./connection";

export interface ModuleObj {
  id: number;
  module: Module;
}

export interface ConnectionObj {
  id: number;
  connection: Connection;
}
